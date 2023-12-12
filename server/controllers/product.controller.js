import Product from "../models/product.model.js";
import errorHandler from "../helpers/dbErrorHandlers.js";

const create = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    photo: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
    category: req.body.category,
    stock: req.body.stock,
  });
  try {
    await product.save();
    return res.status(200).json({ message: "Product successfuly created!" });
  } catch (err) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
const list = async (req, res) => {
  try {
    let products = await Product.find({ isDeleted: false })
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "reviews",
        select: "user rating comment",
        populate: { path: "user", select: "name lastname email" },
      });
    res.json(products);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const productByID = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    req.product = product;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retreive product",
    });
  }
};

const read = async (req, res) => {
  try {
    await req.product.populate({
      path: "reviews",
      select: "user rating comment",
      populate: { path: "user", select: "name lastname email" },
    });
    return res.json(req.product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    let product = req.product;
    req.body = { ...req.body, updated: Date.now() };
    await Product.findByIdAndUpdate(
      product._id,
      { $set: req.body },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    let product = req.product;
    if (req.body.type == "soft") {
      await Product.findByIdAndUpdate(
        product._id,
        { isDeleted: true },
        { new: true }
      );
      res
        .status(200)
        .json({ message: `Product ${product._id} has been SoftDeleted!` });
    } else {
      await Product.findByIdAndDelete(product._id);
      res
        .status(200)
        .json({ message: `Product ${product._id} has been Deleted!` });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

export default { create, productByID, read, list, remove, update };
