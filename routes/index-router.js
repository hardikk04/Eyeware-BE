import express from "express";

// Controller
import {
  loginPageRenderController,
  registerPageRenderController,
} from "../controllers/index-controller.js";

const router = express.Router();

router.get("/register", registerPageRenderController);
router.get("/", loginPageRenderController);

export default router;
