const express = require("express");
const router = express.Router();
const {
  addItemToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartSummary,
} = require("../controllers/cart.controller");
const auth = require("../middlewares/auth.middleware");

// All cart routes require authentication
router.use(auth);

// Cart management routes
router.post("/add", addItemToCart); // POST /cart/add - Add item to cart
router.get("/", getCart); // GET /cart - View cart
router.get("/summary", getCartSummary); // GET /cart/summary - Get cart summary
router.put("/item/:productId", updateCartItem); // PUT /cart/item/:productId - Update item quantity
router.delete("/item/:productId", removeCartItem); // DELETE /cart/item/:productId - Remove item
router.delete("/clear", clearCart); // DELETE /cart/clear - Clear entire cart

module.exports = router;
