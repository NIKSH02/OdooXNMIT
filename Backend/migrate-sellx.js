const mongoose = require("mongoose");
require("dotenv").config();

// Import models to ensure indexes are created
const Product = require("./src/models/Product.model");
const Cart = require("./src/models/Cart.model");
const Order = require("./src/models/Order.model");
const SupplierListing = require("./src/models/SupplierListing.model");
const MaterialRequest = require("./src/models/MaterialRequest.model");
const Sample = require("./src/models/Sample.model");

const runMigrations = async () => {
  try {
    console.log("🚀 Starting Sellx backend migrations...");

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Create indexes for all models
    console.log("📊 Creating database indexes...");

    // Create Product indexes
    await Product.createIndexes();
    console.log("✅ Product model indexes created");

    // Create Cart indexes
    await Cart.createIndexes();
    console.log("✅ Cart model indexes created");

    // Create/update Order indexes
    await Order.createIndexes();
    console.log("✅ Order model indexes created");

    // Update existing model indexes
    await SupplierListing.createIndexes();
    console.log("✅ SupplierListing model indexes updated");

    await MaterialRequest.createIndexes();
    console.log("✅ MaterialRequest model indexes updated");

    await Sample.createIndexes();
    console.log("✅ Sample model indexes updated");

    console.log("🎉 All migrations completed successfully!");
    console.log("\n📋 Summary of changes:");
    console.log("• Added new Product model with enhanced fields");
    console.log("• Added Cart model for cart functionality");
    console.log("• Updated Order model to support cart-based orders");
    console.log("• Updated category enums across all models");
    console.log("• Created all necessary database indexes");
    console.log("\n🔗 New API endpoints available:");
    console.log("• POST /api/items - Create new product");
    console.log("• GET /api/items - Get all products with filters");
    console.log("• GET /api/items/:id - Get product by ID");
    console.log("• POST /api/cart/add - Add item to cart");
    console.log("• GET /api/cart - View cart");
    console.log("• DELETE /api/cart/item/:productId - Remove item from cart");
    console.log("• POST /api/orders/create-from-cart - Create order from cart");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
};

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations();
}

module.exports = runMigrations;
