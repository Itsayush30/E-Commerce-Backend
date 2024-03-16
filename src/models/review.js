const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


const Review = mongoose.model("Review", reviewSchema); //creating model
module.exports = Review;
