const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const ReviewService = require("../services/review-service");
const reviewService = new ReviewService();

const createReview = async (req, res) => {
  try {
    const response = await reviewService.create(req.body);
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};


module.exports = { createReview };