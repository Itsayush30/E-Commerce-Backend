const CrudRepository = require("./crud-repository");
const Product = require("../models/product");

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }
  async updateProduct(productId, updatedProductData) {
    try {
      //console.log(productId, updatedProductData);
      //console.log("->", productId);
      //console.log("->", updatedProductData);
      const updatedProduct = await Product.findOneAndUpdate(
        { id:productId },
        updatedProductData,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error;
    }
  }
}

module.exports = ProductRepository;
