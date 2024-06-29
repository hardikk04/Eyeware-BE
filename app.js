// Requiring modules
import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import flash from "connect-flash"
import dotenv from "dotenv";
dotenv.config();

// MongoDB connection
import mongoDB from "./config/db-connection.js";

const app = express();

// Setup ejs
app.set("view engine", "ejs");

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Require router
import indexRoute from "./routes/index-router.js";
import profileRoute from './routes/profile-router.js'
import productRoute from "./routes/product-router.js";

// Setup middleware routes
app.use("/", indexRoute);
app.use("/profile", profileRoute);
app.use("/product", productRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running on PORT " + process.env.PORT);
});
