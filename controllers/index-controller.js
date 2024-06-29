import {
  userModel,
  userRegisterValidator,
  userLoginValidator,
} from "../models/user-model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const loginPageRenderController = (req, res) => {
  const flashError = req.flash("error");
  res.render("login", { error: flashError });
};

const registerPageRenderController = (req, res) => {
  const flashError = req.flash("error");
  res.render("register", { error: flashError });
};

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { error } = userRegisterValidator({ name, email, password });
    if (error) {
      req.flash("error", error.message);
      return res.status(400).redirect("/register");
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash("error", "Email already exists");
      return res.status(400).redirect("/register");
    }
    bcrypt.hash(password, 12, async (err, hash) => {
      const newUser = await userModel.create({
        email,
        name,
        password: hash,
      });
      const token = generateToken(newUser);
      res.cookie("token", token);
      res.redirect("/profile");
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("catch error");
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = userLoginValidator({ email, password });
    if (error) {
      req.flash("error", error.message);
      return res.status(400).redirect("/");
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      req.flash("error", "Something went wrong");
      return res.redirect("/");
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = generateToken(user);
          res.cookie("token", token);
          return res.redirect("/profile");
        } else {
          req.flash("error", "Invalid credentials");
          return res.redirect("/");
        }
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send("catch error");
  }
};

export {
  loginPageRenderController,
  registerPageRenderController,
  registerController,
  loginController,
};
