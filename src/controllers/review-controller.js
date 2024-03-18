const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const ReviewService = require("../services/review-service");
const reviewService = new ReviewService();

const createReview = async (req, res) => {
  try {
    console.log("HERE", req.body);
    const response = await reviewService.create({
      ...req.body,
      userId: req.user,
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

async function getAllPendingReviews(req, res) {
  try {
    const data = { status: "pending" };
    const products = await reviewService.getAllPendingReviews(data);
    SuccessResponse.data = products;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getReviewById(req, res) {
  try {
    console.log("params", req.params);
    const products = await reviewService.getReviewById(req.params);
    SuccessResponse.data = products;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function rejected(req, res) {
  try {
    const productId = req.params.id;
    const updatedProductData = { status: "rejected",adminId: req.user };
    console.log("paramsAdmin", req.user);
    const products = await reviewService.rejected(
      productId,
      updatedProductData
    );
    SuccessResponse.data = products;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
} 

async function approved(req, res) {
  try {
    const productId = req.params.id;
    const updatedProductData = { status: "approved" };
    console.log("params", req.params.id);
    const products = await reviewService.approved(
      productId,
      updatedProductData
    );
    SuccessResponse.data = products;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getReviewByUserId(req, res) {
  try {
    console.log("params", req.user);
    const products = await reviewService.getReviewByUserId({
      userId: req.user,
    });
    SuccessResponse.data = products;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createReview,
  countReview,
  getAllPendingReviews,
  getReviewById,
  rejected,
  approved,
  getReviewByUserId,
};
