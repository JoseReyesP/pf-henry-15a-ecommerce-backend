import User from "../models/user.model.js";
import PurchaseHistory from "../models/purchaseHistory.model.js";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import config from "../../config/config.js";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import sendNotification from "../controllers/notifications.controller.js";
dotenv.config();

const create = async (req, res) => {
  const user = new User(req.body);
  const { email, name } = req.body;
  try {
    await user.save();
    await sendNotification(email, name);
    return res.status(200).json({ message: "Successfully signed up!" });
  } catch (err) {
    return res.status(400).json({ error: "error al crear usuario " + err });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find({ isDeleted: false })
      .select("name lastname email updated shoppingCart created")
      .populate({
        path: "shoppingCart",
      });
    res.json(users);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const userByID = async (req, res, next, id) => {
  // If a matching user is found in the database, the user object is appended to the request
  // object in the profile key. Then, the next() middleware is used to propagate control
  // to the next controller function.
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retreive user",
    });
  }
};

const read = (req, res) => {
  // The read function retrieves the user details from req.profile and removes
  // sensitive information, such as the hashed_password and salt values, before
  // sending the user object in the response to the requesting client.
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    req.body = { ...req.body, updated: Date.now() };
    await User.findByIdAndUpdate(user._id, { $set: req.body }, { new: true });
    res
      .status(200)
      .json({ message: "the profile has been updated successfuly!" });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    let user = req.profile;
    if (req.body.type == "soft") {
      await User.findByIdAndUpdate(
        user._id,
        { isDeleted: true },
        { new: true }
      );
      res
        .status(200)
        .json({ message: `User ${user._id} has been SoftDeleted!` });
    } else {
      await User.findByIdAndDelete(user._id);
      res.status(200).json({ message: `User ${user._id} has been Deleted!` });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const addToShoppingCart = async (req, res) => {
  const { product } = req.query;
  try {
    await User.findByIdAndUpdate(
      req.profile._id,
      { $set: { shoppingCart: [...req.profile.shoppingCart, product] } },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "product has being added to the shopping cart" });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error: product not added to shopping cart",
    });
    console.log(error);
  }
};

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  addToShoppingCart,
};
