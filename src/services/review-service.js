const { StatusCodes } = require("http-status-codes");
const ReviewRepository = require("../repositories/review-repository");
const AppError = require("../utils/errors/app-error");

class ReviewService {
  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  async create(data) {
    try {
      console.log("data",data);
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
      const review = await this.reviewRepository.countReview();
      return review;
    } catch (error) {
      throw new AppError(
        "cannot count a new review",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

}

module.exports = ReviewService;
