const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  priceAtTime: {
    type: Number,
    required: true,
    min: 0,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalItems: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate totals before saving
CartSchema.pre("save", function (next) {
  this.totalItems = this.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.priceAtTime * item.quantity,
    0
  );
  this.lastUpdated = new Date();
  next();
});

// Method to add item to cart
CartSchema.methods.addItem = function (productId, quantity, price) {
  const existingItem = this.items.find(
    (item) => item.productId.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.priceAtTime = price; // Update price to current price
    existingItem.addedAt = new Date();
  } else {
    this.items.push({
      productId,
      quantity,
      priceAtTime: price,
      addedAt: new Date(),
    });
  }

  return this.save();
};

// Method to update item quantity
CartSchema.methods.updateItemQuantity = function (productId, quantity) {
  const item = this.items.find(
    (item) => item.productId.toString() === productId.toString()
  );

  if (item) {
    if (quantity <= 0) {
      this.items = this.items.filter(
        (item) => item.productId.toString() !== productId.toString()
      );
    } else {
      item.quantity = quantity;
      item.addedAt = new Date();
    }
  }

  return this.save();
};

// Method to remove item from cart
CartSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );

  return this.save();
};

// Method to clear cart
CartSchema.methods.clearCart = function () {
  this.items = [];
  return this.save();
};

// Method to get cart summary
CartSchema.methods.getSummary = function () {
  return {
    totalItems: this.totalItems,
    totalPrice: this.totalPrice,
    itemCount: this.items.length,
    lastUpdated: this.lastUpdated,
  };
};

// Index for faster user lookup
CartSchema.index({ userId: 1 });
CartSchema.index({ "items.productId": 1 });

module.exports = mongoose.model("Cart", CartSchema);
