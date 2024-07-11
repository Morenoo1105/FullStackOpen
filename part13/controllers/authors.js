const router = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../util/db");

router.get("/", async (req, res) => {
  const data = await Blog.findAll({
    group: ["author"],
    attributes: [
      "author",
      [sequelize.fn("COUNT", "*"), "blogs"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    order: [[sequelize.col("likes"), "DESC"]],
  });

  res.json(data);
});

module.exports = router;
