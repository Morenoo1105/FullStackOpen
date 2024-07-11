const router = require("express").Router();

const { Blog, User } = require("../models");
const { blogFinder, tokenExtractor } = require("../util/middleware");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: { model: User, attributes: ["name"] },
  });

  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) res.json(req.blog);

  res.status(404).end();
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });

    return res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", [blogFinder, tokenExtractor], async (req, res) => {
  if (req.blog.userId !== req.decodedToken.id)
    return res.status(401).json({ error: "Unauthorized" });

  if (req.blog) await req.blog.destroy();

  res.status(204).end();
});

router.put("/:id", blogFinder, async (req, res, next) => {
  if (!req.blog) res.status(404).end();
  try {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json({ likes: req.blog.likes });
  } catch {
    next(error);
  }
});

module.exports = router;
