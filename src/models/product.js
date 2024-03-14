const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
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


const Product = mongoose.model("Product", productSchema); //creating model
module.exports = Product;
