import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const dbConnect = async () => {
  console.log("database connecting...");
  try {
    mongoose.connect(process.env.DB_URL, {});
    console.log("successfully connected!");
  } catch (error) {
    console.log("failed to connect!");
  }
};

export default dbConnect;