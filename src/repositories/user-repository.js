const CrudRepository = require("./crud-repository");
const User = require("../models/user");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    try {
      console.log(email);
      const result = await User.findOne({ email });
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error;
    }
  }
}

module.exports = UserRepository;