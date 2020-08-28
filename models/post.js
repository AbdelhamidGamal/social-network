const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  likes: [LikesSchema],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
