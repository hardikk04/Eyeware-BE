import jwt from "jsonwebtoken";
import { userModel } from "../models/user-model.js";

const isLoggedIn = (req, res, next) => {
  if (req.cookies.token) {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          res.redirect("/");
        } else {
          const user = await userModel.findOne({ _id: decoded.userId });
          req.user = user;
          next();
        }
      }
    );
  } else {
    res.redirect("/");
  }
};

const redirectIfLoggedIn = (req, res, next) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      if (decoded) {
        res.redirect("/profile");
      }
    });
  } else {
    next();
  }
};

export { isLoggedIn, redirectIfLoggedIn };
