const { ReadingList, Blog } = require("../models");
const router = require("express").Router();
const { tokenExtractor } = require("../util/middleware");

router.post("/", async (req, res) => {
  const readinglistEntry = await ReadingList.create({
    blogId: req.body.blog_id,
    userId: req.body.user_id,
  });
  res.json(readinglistEntry);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const updatedReadingListEntry = await ReadingList.findByPk(req.params.id);

  if (updatedReadingListEntry.userId !== req.decodedToken.id)
    return res.status(401).json({ error: "Unauthorized" });

  updatedReadingListEntry.read = req.body.read;

  await updatedReadingListEntry.save();

  res.json(updatedReadingListEntry);
});

module.exports = router;
