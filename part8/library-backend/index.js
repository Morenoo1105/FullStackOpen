require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const SECRET = process.env.SECRET;

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

/*
let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];
*/

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
      ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
    createUser(
        username: String!
        favoriteGenre: String!
      ): User
    login(
        username: String!
        password: String!
      ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = Book.find({}).populate("author");

      // if (args.author && args.genre)
      //   return books.filter(
      //     (book) =>
      //       book.author === args.author && book.genres.includes(args.genre)
      //   );

      // if (args.author)
      //   return books.filter((book) => book.author === args.author);

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

      return book.save().catch((error) => {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      });

      // const book = { ...args, id: uuid() };
      // books = books.concat(book);
      // if (!authors.find((author) => author.name === args.author)) {
      //   authors = authors.concat({ name: args.author, id: uuid() });
      // }
      // return book;
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET);
      const currentUser = await User.findOne({
        username: decodedToken.username,
      });

      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
