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
}

module.exports = ReviewRepository;
