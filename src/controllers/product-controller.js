const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const ProductService = require("../services/product-service");
const productRepository = new ProductService();

async function getAllProducts(req, res) {
  try {
    const products = await productRepository.getAllProducts();
    SuccessResponse.data = products;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = getAllProducts;
