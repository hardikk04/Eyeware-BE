import { userModel, userValidator } from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginPageRenderController = (req, res) => {
  res.render("login");
};

const registerPageRenderController = (req, res) => {
  res.render("register");
};

export { loginPageRenderController, registerPageRenderController };
