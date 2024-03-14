const express = require("express");
const connect = require("./config/database");
const apiRoutes = require("./routes");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

console.log(process.env.PORT);

//const fetch = require("node-fetch"); // for making HTTP requests
const Product = require("./models/product"); // Import the Product model

async function fetchAndStoreProducts(url) {
  try {
    const response = await fetch(url);
    const products = await response.json();

    for (const product of products) {
      // Check if the product already exists in the database
      const existingProduct = await Product.findOne({ id: product.id });

      if (existingProduct) {
        // Product already exists, you can update it if necessary
        console.log(
          `Product with ID ${product.id} already exists in the database. Skipping.`
        );
      } else {
        // Product does not exist, insert it into the database
        await Product.create(product);
        console.log(
          `Product with ID ${product.id} inserted into the database.`
        );
      }
    }

    console.log("Products fetched and stored successfully.");
  } catch (error) {
    console.error("Error fetching and storing products:", error);
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Express server started at ${PORT}`);
  try {
    await connect();
    console.log(process.env.PORT);
    console.log("MongoDB connected");
    await fetchAndStoreProducts(
      "https://64e0caef50713530432cafa1.mockapi.io/api/products"
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
});
