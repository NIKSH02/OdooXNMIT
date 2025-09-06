const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const asyncHandler = require("../utils/asynchandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

// Add item to cart
const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user._id;

  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }

  if (quantity <= 0) {
    throw new ApiError(400, "Quantity must be greater than 0");
  }

  // Check if product exists and is available
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (!product.isActive) {
    throw new ApiError(400, "Product is not available");
  }

  if (product.quantity < quantity) {
    throw new ApiError(
      400,
      `Only ${product.quantity} items available in stock`
    );
  }

  // Check if user is trying to add their own product
  if (product.userId.toString() === userId.toString()) {
    throw new ApiError(400, "You cannot add your own product to cart");
  }

  // Find or create cart
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId });
  }

  // Add item to cart
  await cart.addItem(productId, quantity, product.price);

  // Populate cart items with product details
  await cart.populate({
    path: "items.productId",
    select: "productTitle price productCategory imageUrl isActive quantity",
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        cart,
        summary: cart.getSummary(),
      },
      "Item added to cart successfully"
    )
  );
});

// Get user's cart
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select:
      "productTitle price productCategory imageUrl isActive quantity userId",
    populate: {
      path: "userId",
      select: "name username",
    },
  });

  if (!cart) {
    cart = new Cart({ userId });
    await cart.save();
  }

  // Filter out inactive products or products that are no longer available
  const validItems = cart.items.filter(
    (item) =>
      item.productId && item.productId.isActive && item.productId.quantity > 0
  );

  // If any items were filtered out, update the cart
  if (validItems.length !== cart.items.length) {
    cart.items = validItems;
    await cart.save();
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        cart,
        summary: cart.getSummary(),
      },
      "Cart retrieved successfully"
    )
  );
});

// Update item quantity in cart
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user._id;

  if (quantity < 0) {
    throw new ApiError(400, "Quantity cannot be negative");
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  // Check if product exists and has enough stock
  if (quantity > 0) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    if (product.quantity < quantity) {
      throw new ApiError(
        400,
        `Only ${product.quantity} items available in stock`
      );
    }
  }

  await cart.updateItemQuantity(productId, quantity);

  // Populate cart items with product details
  await cart.populate({
    path: "items.productId",
    select: "productTitle price productCategory imageUrl isActive quantity",
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        cart,
        summary: cart.getSummary(),
      },
      quantity > 0 ? "Cart item updated successfully" : "Item removed from cart"
    )
  );
});

// Remove item from cart
const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  await cart.removeItem(productId);

  // Populate cart items with product details
  await cart.populate({
    path: "items.productId",
    select: "productTitle price productCategory imageUrl isActive quantity",
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        cart,
        summary: cart.getSummary(),
      },
      "Item removed from cart successfully"
    )
  );
});

// Clear entire cart
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  await cart.clearCart();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        cart,
        summary: cart.getSummary(),
      },
      "Cart cleared successfully"
    )
  );
});

// Get cart summary (lighter response)
const getCartSummary = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalItems: 0,
          totalPrice: 0,
          itemCount: 0,
          lastUpdated: new Date(),
        },
        "Cart summary retrieved"
      )
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        cart.getSummary(),
        "Cart summary retrieved successfully"
      )
    );
});

module.exports = {
  addItemToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartSummary,
};
