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

router.get("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
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
