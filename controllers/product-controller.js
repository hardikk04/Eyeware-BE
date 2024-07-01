import { productModel, productValidator } from "../models/product-model.js";

const productPageRenderController = (req, res) => {
  res.render("product");
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
    user.cart.push(product._id);
    await user.save();
    res.send(product);
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

export {
  productPageRenderController,
  productCreateController,
  productCreateRenderController,
};
