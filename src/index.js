const express = require("express");
const connect = require("./config/database");
const apiRoutes = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const PRODUCT_URL = process.env.PRODUCT_URL;

const Product = require("./models/product");

async function fetchAndStoreProducts(url) {
  try {
    const response = await fetch(url);
    const products = await response.json();

    for (const product of products) {
      //  if the product already exists
      const existingProduct = await Product.findOne({ id: product.id });

      if (existingProduct) {
        console.log(
          `Product with ID ${product.id} already exists in the database. Skipping.`
        );
      } else {
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

app.use(cors());

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Express server started at ${PORT}`);
  try {
    await connect();
    console.log("MongoDB connected");
    await fetchAndStoreProducts(PRODUCT_URL);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
});
