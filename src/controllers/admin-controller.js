const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AdminService = require("../services/admin-service");
const adminService = new AdminService();


const createAdmin = async (req, res) => {
  try {
    const response = await adminService.create({
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



async function adminsignin(req, res) {
  try {
    const admin = await adminService.signin({
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

module.exports = {adminsignin,createAdmin};
