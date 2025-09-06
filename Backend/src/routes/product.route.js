const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getMyProducts,
  updateProduct,
  toggleProductStatus,
  deleteProduct,
} = require("../controllers/product.controller");
const auth = require("../middlewares/auth.middleware");

// Public routes
router.get("/", getAllProducts); // GET /products - Get all products with filters
router.get("/category/:category", getProductsByCategory); // GET /products/category/:category - Get products by category
router.get("/:id", getProductById); // GET /products/:id - Get product by ID

// Protected routes (require authentication)
router.use(auth);

// Product management routes
router.post("/", createProduct); // POST /products - Create new product
router.get("/user/my-products", getMyProducts); // GET /products/user/my-products - Get user's products
router.put("/:id", updateProduct); // PUT /products/:id - Update product
router.patch("/:id/toggle-status", toggleProductStatus); // PATCH /products/:id/toggle-status - Toggle product status
router.delete("/:id", deleteProduct); // DELETE /products/:id - Delete product

module.exports = router;
