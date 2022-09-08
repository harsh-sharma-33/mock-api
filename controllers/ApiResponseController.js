import ApiResponse, { requestTypes } from "../models/ApiResponseModel.js";

const handleApiResponseRequest = (req, res) => {
  const fullUrl = req.originalUrl;
  console.log(fullUrl);
  ApiResponse.find({
    path: fullUrl,
    //  requestType: requestTypes.GET
  })
    .then((response) => {
      console.log(response);
      res.json(response[0].response);
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500);
      res.json({ message: error.message });
    });
};

export { handleApiResponseRequest };
