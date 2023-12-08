import Review from "../models/review.model.js";
import Product from "../models/product.model.js";

const create = async (req, res) => {
  // recommendation: to restrict a user of leaving bad reviews on a product under other user's id
  // enviromental variables are highly recommended.
  try {
    const review = new Review(req.body);
    await review.save();
    // once we have created and saved the review, the next step is to relate it
    // to the product being rated
    const product = await Product.findById(req.body.product);
    product.reviews.push(review._id);
    product.save();
    return res.status(200).json({ message: "Review successfuly created!" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const list = async (req, res) => {
  try {
    let reviews = await Review.find({ isDeleted: false })
      .select("user product rating comment")
      .populate({
        path: "user",
        select: "name lastname email",
      })
      .populate({
        path: "product",
        select: "title price category",
        populate: { path: "category", select: "name" },
      });
    res.status(200).json(reviews);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const reviewByID = async (req, res, next, id) => {
  try {
    let review = await Review.findById(id);
    if (!review) {
      return res.status(400).json({
        error: "Review not found",
      });
    }
    req.review = review;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retreive review",
    });
  }
};

const read = (req, res) => {
  return res.json(req.review);
};

const update = async (req, res) => {
  try {
    let review = req.review;
    req.body = { ...req.body, updated: Date.now() };
    await Review.findByIdAndUpdate(
      review._id,
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
    let review = req.review;
    console.log(req.body);
    if (req.body.type == "soft") {
      await Review.findByIdAndUpdate(
        review._id,
        { isDeleted: true },
        { new: true }
      );
      res
        .status(200)
        .json({ message: `Review ${review._id} has been SoftDeleted!` });
    } else {
      await Review.findByIdAndDelete(review._id);
      res
        .status(200)
        .json({ message: `Review ${review._id} has been Deleted!` });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

export default { create, reviewByID, read, list, remove, update };
