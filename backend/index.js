import express from "express";
import loginRouter from "./routes/login.route.js";
import mongoose from "mongoose";
import "dotenv/config";
import loginModel from "./models/loginModel.js";

const app = express();
app.use(express.json());

app.listen(4000, async () => {
	console.log("Server has started");
	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
		console.log("Connected to DB.");
	} catch (err) {
		console.log(err);
	}
});

app.get("/", (req, res) => {
	res.send("Hello");
});

app.get("/add-blog",async(req,res)=>{
  try{
    const response=await loginModel.create({
      title:"roman",
      description:"sdfgsg"
    })
    res.json(response)
  }catch(err){
    res.json(err)
  }
})

app.use("/login", loginRouter);
