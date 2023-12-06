import User from "../models/user.model.js";
import userCtrl from "../controllers/user.controller.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "./../../config/config.js";

const signin = async (req, res) => {
  // The POST request object receives the email and password in req.body. This email is
  // used to retrieve a matching user from the database. Then, the password
  // authentication method defined in UserSchema is used to verify the password that's
  // received in req.body from the client.
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match." });
    }
    //  If the password is successfully verified, the JWT module is used to generate a signed
    // JWT using a secret key and the user's _id value.
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

const signout = (req, res) => {
  // The signout function clears the response cookie containing the signed JWT. This is
  // an optional endpoint and not really necessary for auth purposes if cookies are not
  // used at all in the frontend.
  res.clearCookie("t");
  return res.status(200).json({ message: "signed out" });
};
const requireSignin = expressjwt({
  // We can add requireSignin to any route that should be protected against
  // unauthenticated access.
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});
const hasAuthorization = async (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    // here we check if the user trying to modify the profile is an Admin
    const adminProfile = await User.findById(req.auth._id);
    const { role } = adminProfile;
    if (role !== "admin") {
      // if the modifier profile is not an admin then is not authorized
      return res.status(403).json({
        error: "User is not authorized",
      });
    }
  }
  next();
};

const isAdmin = (req, res) => {
  const { role } = req.profile;
  if (!role.includes("admin"))
    return res
      .status(403)
      .json({ message: "Forbidden, you are not an Admin." });
  return res.status(200).json({ message: true });
};

export default { signin, signout, requireSignin, hasAuthorization, isAdmin };
