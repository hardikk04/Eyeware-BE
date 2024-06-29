import express from "express";

// Controller
import {
  loginPageRenderController,
  registerPageRenderController,
  registerController,
  loginController,
} from "../controllers/index-controller.js";
import {
  isLoggedIn,
  redirectIfLoggedIn,
} from "../middleware/login-middleware.js";

const router = express.Router();

router.get("/register", redirectIfLoggedIn, registerPageRenderController);
router.get("/", redirectIfLoggedIn, loginPageRenderController);

router.post("/register", registerController);
router.post("/", loginController);

export default router;
