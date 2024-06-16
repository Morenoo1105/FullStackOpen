const commentsRouter = require("express").Router();
const Comment = require("../models/comment");

commentsRouter.get("/:blogId/comments", async (request, response) => {
  const blogId = request.params.blogId;
  const comments = await Comment.find({ blog: blogId });
  response.status(200).json(comments);
});

commentsRouter.post("/:blogId/comments", async (request, response) => {
  const existingComments = await Comment.find({});

  if (existingComments.length >= 10) {
    await Comment.findByIdAndDelete(existingComments[0]._id);
  }

  const blogId = request.params.blogId;
  const newComment = new Comment({
    content: request.body.content,
    blog: blogId,
  });
  const savedNewComment = await newComment.save();
  response.status(201).json(savedNewComment);
});

commentsRouter.delete("/comments/:commentId", async (request, response) => {
  const commentId = request.params.commentId;
  await Comment.findByIdAndDelete(commentId);
  response.status(200).json();
});

module.exports = commentsRouter;
