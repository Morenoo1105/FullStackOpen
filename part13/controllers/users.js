const router = require("express").Router();

const { User, Blog } = require("../models");
const { userFinder } = require("../util/middleware");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const read = req.query.read;
  const where = {};
  if (read) where.read = read;

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      through: {
        attributes: ["id", "read"],
        where,
      },
    },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", userFinder, async (req, res, next) => {
  if (!req.user) res.status(404).end();

  try {
    req.user.username = req.body.username;
    await req.user.save();
    res.json({ username: req.user.username });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
