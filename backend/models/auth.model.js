import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: String,
  userName: String,
  password:String
});

const authModel = mongoose.model("auth", authSchema);

export default authModel;
