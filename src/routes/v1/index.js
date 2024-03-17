const express = require("express");

const {
  adminsignin,
  createAdmin,
} = require("../../controllers/admin-controller");
const { usersignin, createUser } = require("../../controllers/user-controller");
const {getAllProducts, updateProduct} = require("../../controllers/product-controller");

const {
  validateAuthRequest,
  checkAuth,
} = require("../../middlewares/auth-request-middleware");

const {createReview, countReview, getAllPendingReviews, getReviewById, rejected, approved, getReviewByUserId} = require("../../controllers/review-controller")

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
router.get("/products",checkAuth, getAllProducts);

// /api/v1/products/:id PUT
router.put("/products/:id", updateProduct);

// /api/v1/review POST
router.post("/review/:id", checkAuth,createReview);

// /api/v1/review/count GET
router.get("/review/count", countReview);

// /api/v1/review/all GET
router.get("/review/pending", getAllPendingReviews);

// /api/v1/review/:id GET
router.get("/review/:id", getReviewById);

// /api/v1/reject/:id GET
router.post("/reject/:id", rejected);

// /api/v1/approve/:id GET
router.post("/approve/:id", approved);

// /api/v1/profilereview GET
router.get("/profilereview", checkAuth,getReviewByUserId);



module.exports = router;