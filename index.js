import express from "express";
import connectDB from "./config/db.js";
import {
  handleApiResponseRequest,
  saveApiInputs,
} from "./controllers/ApiResponseController.js";
import cors from "cors";

connectDB();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.send("Api up and running");
});

app.post("/api/add-api", saveApiInputs);
app.all("*", handleApiResponseRequest);

app.listen(3000, () => {
  console.log("api running");
});
