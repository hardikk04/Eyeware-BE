import express from "express";
import {
  productPageRenderController,
  productCreateController,
  productCreateRenderController,
  productAddToCartController,
  productRemoveToCartController
} from "../controllers/product-controller.js";
import {
  isLoggedIn,
  redirectIfLoggedIn,
} from "../middleware/login-middleware.js";
import upload from "../config/multer-config.js";
import { productModel } from "../models/product-model.js";

const router = express.Router();

router.get("/:id", isLoggedIn, productPageRenderController);

router.get("/add/:id", isLoggedIn, productAddToCartController);
router.get("/remove/:id", isLoggedIn, productRemoveToCartController);

router.get("/create", isLoggedIn, productCreateRenderController);
router.post(
  "/create",
  isLoggedIn,
  upload.single("image"),
  productCreateController
);

export default router;
