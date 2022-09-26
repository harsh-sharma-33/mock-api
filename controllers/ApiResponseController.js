import colors from "colors";
import { WidgetModel } from "../models/WidgetModel.js";

const handleApiResponseRequest = (req, res) => {
  // Consoles ------------
  console.log("HANDLE API RESPONSE".bgRed.bold);
  console.log(colors.bold.yellow.inverse(req.method));
  // Consoles ...........

  const fullUrl = req.originalUrl;

  // Consoles --------------
  console.log(colors.bgGreen.bold(fullUrl));
  // -----------------------
  WidgetModel.findApi(
    { path: fullUrl, requestType: req.method },
    (response) => {
      if (response && response["response"]) {
        res.json(response.response);
      } else {
        res.status(404).send("Not found");
        console.log(colors.bgBlack.white(response));
      }
    },
    (err) => {
      console.error(err.message);
      res.json({ message: err.message });
    }
  );
};

const saveApiInputs = async (req, res) => {
  console.log("SAVE API INPUTS");
  const {
    path,
    requestType,
    response,
    viewName,
    sideNavItem,
    widgetName,
    widgetResponse,
  } = req.body;
  if (viewName && sideNavItem) {
    WidgetModel.findApi(
      {
        "response.name": viewName,
      },
      (result) => {
        if (result) {
          res.json({ message: "View Already exist" });
        } else {
          WidgetModel.addView(
            viewName,
            sideNavItem,
            widgetName,
            widgetResponse,
            (result) => {
              res.send(result);
            },
            (err) => {
              res.json({ message: err.message });
            }
          );
        }
      }
    );
  } else {
    WidgetModel.findApi({ path, requestType }, (result) => {
      if (result) {
        res.json({ message: "Api Already Exist" });
      } else {
        WidgetModel.addNewApi(
          path,
          requestType,
          response,
          (result) => {
            if (result) {
              res.json({ response: result });
            }
          },
          (err) => {
            res.json({ message: err.message });
          }
        );
      }
    });
  }
};

export { handleApiResponseRequest, saveApiInputs };
