import mongoose, { mongo } from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  price: {
    type: Number,
    required: "Price is required",
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: "Image is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model("Product", ProductSchema);
