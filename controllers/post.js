const User = require("../models/user");
const Post = require("../models/post");
const { deleteOne } = require("../models/user");
const mongoose = require("mongoose");
const { body } = require("express-validator");

module.exports = {
  async create(req, res) {
    post = await new Post({ user: req.session.userId, ...req.body }).save();

    return res.json({ post });
  },

  async getAll(req, res) {
    const posts = await Post.find().sort("-date");

    return res.json({ posts });
  },

  async getOne(req, res) {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Not Found" });
    }

    res.json({ post });
  },

  async deleteOne(req, res) {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Not Found" });
    }

    if (req.session.userId !== post.user.toString()) {
      return res.status(401).json({ error: "Not Authorized" });
    }

    await Post.findByIdAndDelete(req.params.id);

    return res.json({ success: "Post Removed" });
  },

  async likeOrNot(req, res) {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Not Found" });
    }

    const liked = post.likes.some(
      (e) => e.user.toString() === req.session.userId
    );

    if (liked) {
      post.likes = post.likes.filter(
        (e) => e.user.toString() !== req.session.userId
      );
    } else {
      post.likes.push({ user: req.session.userId });
    }

    // await Post.findOneAndUpdate({ _id: req.params.id }, { likes: post.likes });
    await post.save();

    res.json({ post });
  },

  async comment(req, res) {
    const post = await Post.findById(req.params.id);

    post.comments.push({ content: req.body.content, user: req.session.userId });

    await post.save();

    return res.json({ post });
  },

  async deleteComment(req, res) {
    const post = await Post.findById(req.params.postId);

    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.commentId
    );

    await post.save();

    res.json(post);
  },
};
