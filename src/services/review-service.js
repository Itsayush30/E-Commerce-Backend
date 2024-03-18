const { StatusCodes } = require("http-status-codes");
const ReviewRepository = require("../repositories/review-repository");
const AppError = require("../utils/errors/app-error");

class ReviewService {
  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  async create(data) {
    try {
      console.log("data", data);
      const review = await this.reviewRepository.create(data);
      return review;
    } catch (error) {
      throw new AppError(
        "cannot create a new review",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async countReview() {
    try {
      const data = { status: "pending" };
      const review = await this.reviewRepository.countReview(data);
      return review;
    } catch (error) {
      throw new AppError(
        "cannot count a new review",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllPendingReviews() {
    try {
      const data = { status: "pending" };
      const products = await this.reviewRepository.find(data);
      if (!products) {
        throw new AppError("No reviews found", StatusCodes.NOT_FOUND);
      }
      return products;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.log(error);
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getReviewById(data) {
    try {
      const products = await this.reviewRepository.find(data);
      if (!products) {
        throw new AppError("No review found", StatusCodes.NOT_FOUND);
      }
      return products;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.log(error);
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async rejected(productId, updatedProductData) {
    try {
      const products = await this.reviewRepository.updateStatus(
        productId,
        updatedProductData
      );
      if (!products) {
        throw new AppError("not rejected", StatusCodes.NOT_FOUND);
      }
      return products;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.log(error);
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async approved(productId, updatedProductData) {
    try {
      const products = await this.reviewRepository.updateStatus(
        productId,
        updatedProductData
      );
      if (!products) {
        throw new AppError("Not rejected", StatusCodes.NOT_FOUND);
      }
      return products;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.log(error);
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getReviewByUserId(data) {
    try {
      const products = await this.reviewRepository.find(data);
      if (!products) {
        throw new AppError("No reviews found", StatusCodes.NOT_FOUND);
      }
      return products;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.log(error);
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getReviewByAdminId(data) {
    try {
      const products = await this.reviewRepository.find(data);
      if (!products) {
        throw new AppError("No reviews found", StatusCodes.NOT_FOUND);
      }
      return products;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.log(error);
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = ReviewService;
