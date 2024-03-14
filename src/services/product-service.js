const { StatusCodes } = require("http-status-codes");
const ProductRepository = require("../repositories/product-repository");
const AppError = require("../utils/errors/app-error");

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    try {
      const products = await this.productRepository.getAll();
      if (!products) {
        throw new AppError("No products found", StatusCodes.NOT_FOUND);
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
module.exports = ProductService;
