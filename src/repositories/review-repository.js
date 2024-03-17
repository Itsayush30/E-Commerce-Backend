const CrudRepository = require("./crud-repository");
const Review = require("../models/review");

class ReviewRepository extends CrudRepository {
  constructor() {
    super(Review);
  }

  async countReview() {
    try {
      const result = await Review.countDocuments();
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error;
    }
  }

  async find(data) {
    try {
      console.log("repo", data);
      const result = await Review.find(data);
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error;
    }
  }

  async updateStatus(productId, updatedProductData) {
    try {
      console.log("repo");
      const result = await Review.findOneAndUpdate(
        { id: productId },
        updatedProductData,
        { new: true }
      );
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error;
    }
  }
}

module.exports = ReviewRepository;
