import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/mockApi", {
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log(res.connection.host);
    })
    .catch(console.err);
};

export default connectDB;
