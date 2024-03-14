const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv"); //it will provide dotenv module object

dotenv.config(); // calling config function from object

function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function createToken(input) {
  try {
    return jwt.sign(input, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  checkPassword,
  createToken,
  verifyToken,
};
