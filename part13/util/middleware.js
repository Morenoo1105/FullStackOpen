const jwt = require("jsonwebtoken");
const { Blog, User, Session } = require("../models");
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

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);

      const sessionOpen = await Session.findOne({
        where: { token },
      });

      if (!sessionOpen) throw new Error("invalid token");

      req.decodedToken = jwt.verify(token, SECRET);
      req.token = token;

      if (req.decodedToken && token) return;
    } catch {
      return res.status(401).json({ error: "invalid token" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }

  next();
};

module.exports = { blogFinder, userFinder, errorHandler, tokenExtractor };
