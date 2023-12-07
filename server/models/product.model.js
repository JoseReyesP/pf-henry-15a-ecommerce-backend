import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

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
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  stock: {
    type: Number,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductReview",
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model("Product", ProductSchema);
