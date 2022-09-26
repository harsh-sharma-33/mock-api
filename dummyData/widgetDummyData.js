import { requestTypes } from "../Schemas/Schemas.js";

export const widgetToBeAddedList = {
  path: "",
  requestType: requestTypes.GET,
  response: {
    page: 0,
    totalPages: 1,
    widgets: [
      {
        id: "",
        name: "TEST Widget",
        supportedFormats: ["REPORT", "ALERT"],
        group: 0,
        position: 0,
      },
    ],
  },
};
