import connectDB from "../config/db.js";
import ApiResponse from "../Schemas/Schemas.js";
import { apiData } from "./data.js";

connectDB();
const importData = () => {
  ApiResponse.deleteMany().then(() => {
    console.log("database cleared");
  });
  ApiResponse.insertMany(apiData)
    .then((response) => {
      console.log("Data imported!");
      process.exit();
    })
    .catch((error) => {
      console.log("Error importing data", error.message);
      process.exit(1);
    });
};

const destroyData = () => {
  ApiResponse.deleteMany()
    .then(() => {
      console.log("database cleared");
      process.exit(0);
    })
    .catch((error) => {
      console.log("Error importing data", error.message);
      process.exit(1);
    });
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
