import mongoose from "mongoose";

const ApiRenponseSchema = new mongoose.Schema({
  path: String,
  requestType: String,
  response: mongoose.Schema.Types.Mixed,
});

const ApiResponse = mongoose.model("ApiResponse", ApiRenponseSchema);
export default ApiResponse;

export const requestTypes = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
};
