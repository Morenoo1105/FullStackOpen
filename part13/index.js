const express = require("express");
require("express-async-errors");

const app = express();
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const { errorHandler } = require("./util/middleware");
const { tokenCleanup } = require("./util/tokenCleanup");

const blogsRouter = require("./controllers/blogs");
const authorsRouter = require("./controllers/authors");
const usersRouter = require("./controllers/users");
const readingListRouter = require("./controllers/readingLists");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingListRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  await tokenCleanup();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
