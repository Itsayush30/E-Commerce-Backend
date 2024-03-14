const express = require("express");
const connect = require("./config/database");
const apiRoutes = require("./routes");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

console.log(process.env.PORT)

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Express server started at ${PORT}`);
  try {
    await connect();
    console.log(process.env.PORT)
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
});