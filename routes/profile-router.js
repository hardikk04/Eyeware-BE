import express from "express";
import { isLoggedIn } from "../middleware/login-middleware.js";
import {
  profilePageRenderController,
  profileLogoutController,
} from "../controllers/profile-controller.js";

const router = express.Router();

router.get("/", isLoggedIn, profilePageRenderController);
router.get("/logout", profileLogoutController);

export default router;
