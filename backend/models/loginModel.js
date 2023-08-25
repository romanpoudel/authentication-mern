import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const loginModel = mongoose.model("auth", loginSchema);

export default loginModel;
