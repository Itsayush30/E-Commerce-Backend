const CrudRepository = require("./crud-repository");
const Review = require("../models/review");

class ReviewRepository extends CrudRepository {
  constructor() {
    super(Review);
  }
 
}

module.exports = ReviewRepository;
