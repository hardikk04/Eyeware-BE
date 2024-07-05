import { productModel, productValidator } from "../models/product-model.js";
import { userModel } from "../models/user-model.js";

const productPageRenderController = async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    res.render("product", { product, user: req.user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const productCreateController = async (req, res) => {
  const user = req.user;
  try {
    const { title, description, price, size, discount, serialNumber } =
      req.body;

    let { inStock } = req.body;

    inStock = inStock === "on" ? true : false;

    const { error } = productValidator({
      title,
      description,
      price,
      size,
      inStock,
      discount,
      serialNumber,
    });

    if (error) {
      req.flash("error", error.message);
      return res.redirect("/product/create");
    }

    if (!req.file) {
      req.flash("error", "Product Image is required");
      return res.redirect("/product/create");
    }

    const product = await productModel.create({
      title,
      description,
      price,
      size,
      inStock,
      discount,
      serialNumber,
      image: req.file.buffer,
      mimeType: req.file.mimetype,
      user: user._id.toString(),
    });

    res.redirect("/profile");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const productCreateRenderController = (req, res) => {
  try {
    res.render("product-create", { error: req.flash("error") });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const productAddToCartController = async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    req.user.cart.push(product._id);
    await req.user.save();
    const previousPage = req.headers.referer || "/profile";
    res.redirect(previousPage);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const productRemoveToCartController = async (req, res) => {
  try {
    req.user.cart = req.user.cart.filter((product) => {
      return product._id.toString() !== req.params.id;
    });
    await req.user.save();
    const previousPage = req.headers.referer || "/profile";
    res.redirect(previousPage);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export {
  productPageRenderController,
  productCreateController,
  productCreateRenderController,
  productAddToCartController,
  productRemoveToCartController,
};
