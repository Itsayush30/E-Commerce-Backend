const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const ReviewService = require("../services/review-service");
const reviewService = new ReviewService();

const createReview = async (req, res) => {
  try {
    console.log("HERE", req.body);
    const response = await reviewService.create({
      ...req.body,
      id: req.params.id,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const countReview = async (req, res) => {
  try {
    const response = await reviewService.countReview();
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

async function getAllReviews(req, res) {
    try {
      const products = await reviewService.getAllReviews();
      SuccessResponse.data = products;
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
      console.log(error);
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }

module.exports = { createReview, countReview, getAllReviews };
