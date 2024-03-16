const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const ProductService = require("../services/product-service");
const productService = new ProductService();

async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    SuccessResponse.data = products;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;

  console.log(productId, updatedProductData);
  console.log("->", productId);
  console.log("->", updatedProductData);

  try {
    const response = await productService.updateProduct(
      productId,
      updatedProductData
    );
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = { getAllProducts, updateProduct };
