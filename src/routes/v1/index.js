const express = require("express");

const {
  adminsignin,
  createAdmin,
} = require("../../controllers/admin-controller");
const { usersignin, createUser } = require("../../controllers/user-controller");
const getAllProducts = require("../../controllers/product-controller");

const {
  validateAuthRequest,
  checkAuth,
} = require("../../middlewares/auth-request-middleware");

const router = express.Router();

// /api/v1/admin POST
router.post("/admin", createAdmin);

// /api/v1/user POST
router.post("/user", createUser);

// /api/v1/admin/signin POST
router.post("/admin/signin", validateAuthRequest, adminsignin);

// /api/v1/user/signin POST
router.post("/user/signin", validateAuthRequest, usersignin);

// /api/v1/products POST
router.get("/products", getAllProducts);

module.exports = router;
