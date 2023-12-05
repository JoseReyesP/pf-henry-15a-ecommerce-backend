import User from "../models/user.model.js";
import errorHandler from "../helpers/dbErrorHandlers.js";

const create = async (req, res) => {
  console.log("creating user...");
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({ message: "Successfully signed up!" });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};
const list = async (req, res) => {
  try {
    let users = await User.find().select("name lastname email updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
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
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.profile._id);
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

export default { create, userByID, read, list, remove, update };
