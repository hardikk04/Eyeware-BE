import express from "express";
import {
  productPageRenderController,
  productCreateController,
  productCreateRenderController,
} from "../controllers/product-controller.js";
import {
  isLoggedIn,
  redirectIfLoggedIn,
} from "../middleware/login-middleware.js";
import upload from "../config/multer-config.js";

const router = express.Router();

router.get("/", isLoggedIn, redirectIfLoggedIn, productPageRenderController);

router.get("/create", isLoggedIn, productCreateRenderController);
router.post(
  "/create",
  isLoggedIn,
  upload.single("image"),
  productCreateController
);

export default router;
