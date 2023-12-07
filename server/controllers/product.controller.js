import Product from "../models/product.model.js";
import errorHandler from "../helpers/dbErrorHandlers.js";

const create = async (req, res) => {
  const user = new Product(req.body);
  try {
    await user.save();
    return res.status(200).json({ message: "Product successfuly created!" });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};
const list = async (req, res) => {
  try {
    let products = await Product.find({ isDeleted: false })
      .select("title price description category updated created")
      .populate({ path: "category", select: "name" });
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
    console.log("productByID : ", req.product, req.type, req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retreive product",
    });
  }
};

const read = (req, res) => {
  return res.json(req.product);
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
    console.log(req.body);
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
