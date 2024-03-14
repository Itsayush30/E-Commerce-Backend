const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", function (next) {
  const admin = this;
  const SALT = bcrypt.genSaltSync(9);
  const encyptedPassword = bcrypt.hashSync(admin.password, SALT);
  admin.password = encyptedPassword;
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
