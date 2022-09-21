import ApiResponse from "../Schemas/Schemas.js";
import colors from "colors";
import { WidgetModel } from "../models/WidgetModel.js";
const handleApiResponseRequest = (req, res) => {
  console.log("HANDLE API RESPONSE".bgRed.bold);
  console.log(colors.bold.yellow.inverse(req.method));
  const fullUrl = req.originalUrl;
  console.log(colors.bgGreen.bold(fullUrl));
  console.log(colors.bgBlue.bold(fullUrl));
  ApiResponse.findOne({ path: fullUrl, requestType: req.method })
    .then((response) => {
      if (response && response["response"]) {
        res.json(response.response);
      } else {
        res.status(404).send("Not found");
        console.log(colors.bgBlack.white(response));
      }
    })
    .catch((error) => {
      console.error(error.message);
      res.status(404);
      res.json({ message: error.message });
    });
};

const saveApiInputs = async (req, res) => {
  console.log("SAVE API INPUTS");
  try {
    const {
      path,
      requestType,
      response,
      viewName,
      sideNavItem,
      widgetId,
      widgetResponse,
    } = req.body;
    if (viewName && sideNavItem) {
      const viewAlreadyExist = await ApiResponse.findOne({
        "response.name": viewName,
      });
      if (viewAlreadyExist) {
        res.json({ message: "view Already exist" });
      } else {
        WidgetModel.addView(
          req,
          res,
          viewName,
          sideNavItem,
          widgetId,
          widgetResponse
        );
      }
    } else {
      const alreadyExist = await ApiResponse.findOne({ path });
      if (alreadyExist) {
        res.json({ message: "already there" });
      } else {
        const api = await ApiResponse.create({
          path,
          requestType,
          response,
        });
        if (api) {
          res.json(api);
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
};

export { handleApiResponseRequest, saveApiInputs };
