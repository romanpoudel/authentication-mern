import express from "express";
import loginRouter from "./routes/login.route.js"
const app = express();

app.listen(4000, () => {
  console.log("connected");
});

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/login", loginRouter)
