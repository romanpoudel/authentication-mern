import express from "express";

const app = express();

app.listen(4000, () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  res.send("Hello");
});
