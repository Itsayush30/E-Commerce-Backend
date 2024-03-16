const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const AdminRepository = require("../../repositories/admin-repository");
const UserRepository = require("../../repositories/user-repository");
const AppError = require("../errors/app-error");

const dotenv = require("dotenv"); 
dotenv.config(); 

const adminRepository = new AdminRepository();
const userRepository = new UserRepository();

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

async function isAuthenticated(token) {
  try {
    //console.log(token")
    if (!token) {
      throw new AppError("Missing jwt token", StatusCodes.BAD_REQUEST);
    }
    const response = verifyToken(token);
    console.log("yahan",response);
    const admin = await adminRepository.get(response.id);
    //console.log(admin)
    if (admin) {
      return admin.id;
    } else {
      const user = await userRepository.get(response.id);
      console.log("yahan pe",user)
      if (user) {
        return user.id;
      } else {
        throw new AppError("Not found", StatusCodes.BAD_REQUEST);
      }
    }
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid JWT token", StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  checkPassword,
  createToken,
  verifyToken,
  isAuthenticated,
};
