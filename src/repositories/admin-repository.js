const CrudRepository = require("./crud-repository");
const Admin = require("../models/admin");

class AdminRepository extends CrudRepository {
  constructor() {
    super(Admin);
  }

  async getAdminByEmail(email) {
    try {
      //console.log(email);
      const result = await Admin.findOne({email});
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error;
    }
  }

}

module.exports = AdminRepository;
