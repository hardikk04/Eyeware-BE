import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDB
const db = mongoose
  .connect(process.env.MONGODB_CONNECTION_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

export default db;
