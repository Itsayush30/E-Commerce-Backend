const { StatusCodes } = require("http-status-codes");
const  UserRepository  = require("../repositories/user-repository");
const AppError = require("../utils/errors/app-error");
const {
  checkPassword,
  createToken,
  verifyToken,
} = require("../utils/common/auth");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      console.log(data);
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      throw new AppError(
        "cannot create a new user",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async signin(data) {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);
      if (!user) {
        throw new AppError(
          "No user found for the given email",
          StatusCodes.NOT_FOUND
        );
      }
      const passwordMatch = checkPassword(data.password, user.password);
      console.log("passwordMatch", passwordMatch);
      if (!passwordMatch) {
        throw new AppError("Invalid Password", StatusCodes.BAD_REQUEST);
      }
      const jwt = createToken({ id: user.id, email: user.email });
      return jwt;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.log(error);
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async isAuthenticated(token) {
    try {
      console.log(token)
      if (!token) {
        throw new AppError("Missing jwt token", StatusCodes.BAD_REQUEST);
      }
      const response = verifyToken(token)
      console.log("this",response);
      const user = await this.userRepository.get(response.id);
      //console.log(admin)
      if (!user) {
        throw new AppError("No user found", StatusCodes.BAD_REQUEST);
      }
      return user.id;
    } catch (error) {
      if (error instanceof AppError) throw error;
      if (error.name == "JsonWebTokenError") {
        throw new AppError("invalid JWT token", StatusCodes.BAD_REQUEST);
      }
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
} // Added closing brace for the UserService class
module.exports = UserService;