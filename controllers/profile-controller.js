import { productModel } from "../models/product-model.js";
import { userModel } from "../models/user-model.js";

const profilePageRenderController = async (req, res) => {
  const products = await productModel.find();
  const userCart = await userModel.findOne({ _id: req.user._id }).populate("cart");
  const user = await userModel.findOne({ _id: req.user._id });
  

  let price = null;
  user.cart.forEach((item) => {
    price += item.price;
  });
  res.render("profile", { products, user,userCart, finalBill: price });
};

const profileLogoutController = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

export { profilePageRenderController, profileLogoutController };
