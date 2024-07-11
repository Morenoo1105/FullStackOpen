const jwt = require("jsonwebtoken");
const { Blog, User } = require("../models");
const { SECRET } = require("./config");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({ where: { username: req.params.username } });
  next();
};

const errorHandler = async (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    return res.status(400).send({ message: err.errors[0].message });
  }

  res.status(400).send({ message: err.message });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "invalid token" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }

  next();
};

module.exports = { blogFinder, userFinder, errorHandler, tokenExtractor };
