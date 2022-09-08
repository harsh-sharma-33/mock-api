import express from "express";
import connectDB from "./config/db.js";
import { handleApiResponseRequest } from "./controllers/ApiResponseController.js";
import cors from "cors";

connectDB();
const app = express();

app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Api up and running");
});

app.all("*", handleApiResponseRequest);

app.listen(3000, () => {
  console.log("api running");
});
