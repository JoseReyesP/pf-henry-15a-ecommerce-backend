import ProductReview from "../models/productReview.model.js";

const create = async (req, res) => {
  const user = new ProductReview(req.body);
  try {
    await user.save();
    return res.status(200).json({ message: "Review successfuly created!" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const list = async (req, res) => {
  try {
    let products = await ProductReview.find({ isDeleted: false });
    res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const productReviewByID = async (req, res, next, id) => {
  try {
    let productReview = await ProductReview.findById(id);
    if (!productReview) {
      return res.status(400).json({
        error: "Review not found",
      });
    }
    req.productReview = productReview;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retreive review",
    });
  }
};

const read = (req, res) => {
  return res.json(req.productReview);
};

const update = async (req, res) => {
  try {
    let product = req.productReview;
    req.body = { ...req.body, updated: Date.now() };
    await ProductReview.findByIdAndUpdate(
      productReview._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: "Your review has been updated!" });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    let productReview = req.productReview;
    console.log(req.body);
    if (req.body.type == "soft") {
      await ProductReview.findByIdAndUpdate(
        productReview._id,
        { isDeleted: true },
        { new: true }
      );
      res
        .status(200)
        .json({ message: `Review ${productReview._id} has been SoftDeleted!` });
    } else {
      await ProductReview.findByIdAndDelete(productReview._id);
      res
        .status(200)
        .json({ message: `Review ${productReview._id} has been Deleted!` });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

export default { create, productReviewByID, read, list, remove, update };
