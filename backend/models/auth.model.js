import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  userName: String,
  password:String,
  token:{
    type:String,
    default:null
  }
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
