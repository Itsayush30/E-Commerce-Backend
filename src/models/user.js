const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
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

userSchema.pre("save", function (next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const encyptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encyptedPassword;
    next();
  });

const User = mongoose.model("User", userSchema); //creating model
module.exports = User;