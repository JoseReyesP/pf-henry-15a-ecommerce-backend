import User from "../models/user.model.js";
import errorHandler from "../helpers/dbErrorHandlers.js";
import PurchaseHistory from "../models/purchaseHistory.model.js";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.sgAPIKey);

const sendNotification = async (user) => {
  const correo = {
    to: user.email,
    from: config.henrucciEmail,
    templateId: "d-c22f2e10e108452284a7216023858f7d",
    dynamic_template_data: {
      subject: "Confirmacion de Registro",
      name: user.name,
    },
  };
  await sgMail.send(correo);
};

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save().then(() => {
      sendNotification(user);
    });
    return res.status(200).json({ message: "Successfully signed up!" });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find({ isDeleted: false })
      .select("name lastname email updated purchaseHistory created")
      .populate({
        path: "purchaseHistory",
        select: "product created",
        populate: { path: "product", select: "title price" },
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

export default { create, userByID, read, list, remove, update };
