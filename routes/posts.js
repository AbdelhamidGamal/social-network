const express = require("express");
const { requireLogin, asyncWrapper } = require("../middlewares");
const {
  create,
  getAll,
  getOne,
  deleteOne,
  likeOrNot,
  comment,
  deleteComment,
} = require("../controllers/post");

const router = express.Router();

// create a post
router.post("/", requireLogin, asyncWrapper(create));

// get all posts
router.get("/", requireLogin, asyncWrapper(getAll));

// get a post by id
router.get("/:id", requireLogin, asyncWrapper(getOne));

// delete a post by id
router.delete("/:id", requireLogin, asyncWrapper(deleteOne));

// like or unlike a post
router.post("/like/:id", requireLogin, asyncWrapper(likeOrNot));

// comment on a post
router.post("/comment/:id", requireLogin, asyncWrapper(comment));

// delete a comment
router.delete("/comment/:postId/:commentId", asyncWrapper(deleteComment));

module.exports = router;
