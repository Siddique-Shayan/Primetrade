import mongoose from "mongoose";
import { Env } from "./env.config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(Env.MONGODB_URI);

    console.log("✅✅ MONGODB Connected Successfully.");
  } catch (error) {
    console.log("❌❌ Error connecting DB.", error);
    process.exit(1);
  }
};

export default connectDB;