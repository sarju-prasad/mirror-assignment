import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = "mongodb+srv://ersarju86:3Kcz6M7myyjnCHbX@cluster0.jolbyhv.mongodb.net/ecomdb?retryWrites=true&w=majority";

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.error("Error while connecting to the database");
    console.error(err);
  }
};


