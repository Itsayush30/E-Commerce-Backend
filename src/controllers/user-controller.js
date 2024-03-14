const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const UserService = require("../services/user-service");
const userService = new UserService();

const createUser = async (req, res) => {
  try {
    const response = await userService.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

async function usersignin(req, res) {
    try {
      const admin = await userService.signin({
        email: req.body.email,
        password: req.body.password,
      });
      SuccessResponse.data = admin;
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
      console.log(error);
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }

module.exports = { createUser,usersignin };