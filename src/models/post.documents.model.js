import mongoose, { Schema } from "mongoose";

const erroRequired = "Campo obrigatório!";

const PostSchema = new Schema({
  name: {
    type: String,
    required: [true, erroRequired],
  },
  size: {
    type: Number,
    required: [true, erroRequired],
  },
  key: {
    type: String,
    required: [true, erroRequired],
  },
  url: {
    type: String,
    required: [false, erroRequired],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model("Post", PostSchema);
