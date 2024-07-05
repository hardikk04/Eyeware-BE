import { productModel } from "../models/product-model.js";

const profilePageRenderController = async (req, res) => {
  const products = await productModel.find();
  res.render("profile", { products, user: req.user });
};

const profileLogoutController = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

export { profilePageRenderController, profileLogoutController };
