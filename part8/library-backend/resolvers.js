const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");

      if (args.genre)
        return await Book.find({ genres: args.genre }).populate("author");

      return books;
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({}).populate("author");
      return authors.map((author) => ({
        name: author.name,
        id: author._id,
        born: author.born,
        bookCount: books.filter((book) => book.author.name === author.name)
          .length,
      }));
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });

      const authors = await Author.find({});

      const author = authors.find((author) => author.name === args.author);

      try {
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
        }
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const newAuthor = await Author.findOne({ name: args.author });
      const book = new Book({ ...args, author: newAuthor });

      try {
        book.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });

      if (!args.name)
        throw new GraphQLError("Name is required", {
          extensions: { code: "BAD_USER_INPUT" },
        });

      const author = await Author.findOne({ name: args.name });
      if (!author) return null;

      author.born = args.setBornTo;

      return author.save().catch((error) => {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      });
    },
    createUser: async (root, args) => {
      if (!args.username || args.username.length < 3)
        throw new GraphQLError("Username must be at least 3 characters long", {
          extensions: { code: "BAD_USER_INPUT" },
        });

      if (!args.favoriteGenre)
        throw new GraphQLError("Favorite genre is required", {
          extensions: { code: "BAD_USER_INPUT" },
        });

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      });
    },
    login: async (root, args) => {
      if (!args.username || !args.password)
        throw new GraphQLError("Username and password missing", {
          extensions: { code: "BAD_USER_INPUT" },
        });

      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password")
        throw new GraphQLError("Invalid username or password", {
          extensions: { code: "UNAUTHENTICATED" },
        });

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
