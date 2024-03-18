const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const upload = require("../services/upload-service");

const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  });
};

module.exports = uploadImage;
