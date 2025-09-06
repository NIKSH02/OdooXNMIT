# Sellx Backend Updates

This document outlines the comprehensive updates made to the VendorVerse backend to support the new Sellx marketplace functionality.

## 🚀 New Features Added

### 1. Enhanced Categories

Updated category system to support diverse marketplace items:

- Cars
- Properties
- Mobiles
- Jobs
- Bikes
- Electronics & Appliances
- Commercial Vehicles & Spares
- Furniture
- Fashion
- Books, Sports & Hobbies
- Pets
- Services

_Note: Legacy categories (vegetables, fruits, etc.) are maintained for backward compatibility._

### 2. Enhanced Product Model

New `Product` model with comprehensive fields:

#### Basic Information

- `productTitle` (string, required) - Product title
- `productCategory` (enum, required) - Category from above list
- `productDescription` (string) - Detailed description
- `price` (number, required) - Product price
- `quantity` (number, default: 1) - Available quantity

#### Condition & Details

- `condition` (enum) - New, Used, Refurbished
- `yearOfManufacture` (number) - Manufacturing year
- `brand` (string) - Brand name
- `model` (string) - Model name/number

#### Physical Properties

- `dimensions` (object) - Length, width, height
- `weight` (number) - Product weight
- `material` (string) - Material composition
- `color` (string) - Primary color

#### Additional Features

- `originalPackaging` (boolean) - Has original packaging
- `manualIncluded` (boolean) - Manual/documentation included
- `workingConditionDescription` (string) - Detailed condition description
- `tags` (array) - Searchable tags
- `contactPreferences` (object) - Communication preferences

### 3. Cart System

Complete cart functionality with:

#### Cart Model Features

- User-specific carts
- Multiple items support
- Automatic total calculation
- Price preservation (at time of adding)
- Quantity management

#### Cart Operations

- Add items to cart
- Update quantities
- Remove items
- Clear entire cart
- Get cart summary

### 4. Enhanced Order System

Updated order system supporting:

#### Multi-Seller Orders

- Cart items grouped by seller
- Separate orders for each seller
- Consolidated checkout experience

#### Order Types

- `from-listing` - Direct product purchase
- `from-request` - Material request fulfillment
- `from-cart` - Cart-based purchase
- `single-item` - Single item purchase

#### Order Status

Updated status options:

- Pending, Confirmed, Shipped, Delivered, Cancelled

## 📡 API Endpoints

### Product Management

```
POST   /api/items                    - Create new product
GET    /api/items                    - Get all products (with filters)
GET    /api/items/:id                - Get product by ID
GET    /api/items/category/:category - Get products by category
GET    /api/items/user/my-products   - Get user's products
PUT    /api/items/:id                - Update product
PATCH  /api/items/:id/toggle-status  - Toggle product active status
DELETE /api/items/:id                - Delete product
```

### Cart Management

```
POST   /api/cart/add                 - Add item to cart
GET    /api/cart                     - View cart
GET    /api/cart/summary             - Get cart summary
PUT    /api/cart/item/:productId     - Update item quantity
DELETE /api/cart/item/:productId     - Remove item from cart
DELETE /api/cart/clear               - Clear entire cart
```

### Order Management

```
POST   /api/orders/create-from-cart  - Create order from cart
POST   /api/orders/place             - Place single order (existing)
GET    /api/orders/buyer/history     - Get buyer order history
GET    /api/orders/seller/orders     - Get seller orders
PATCH  /api/orders/:id/status        - Update order status
```

## 🗄️ Database Schema

### Product Schema Highlights

```javascript
{
  userId: ObjectId,                    // Seller reference
  productTitle: String,               // Required
  productCategory: String,            // From enum list
  price: Number,                      // Required, min: 0
  quantity: Number,                   // Default: 1
  condition: String,                  // New/Used/Refurbished
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  imageUrls: [String],                // Multiple images
  tags: [String],                     // Searchable tags
  isActive: Boolean,                  // Default: true
  viewCount: Number,                  // Track popularity
  soldCount: Number                   // Sales tracking
}
```

### Cart Schema

```javascript
{
  userId: ObjectId,                   // User reference (unique)
  items: [{
    productId: ObjectId,              // Product reference
    quantity: Number,                 // Item quantity
    priceAtTime: Number,              // Price when added
    addedAt: Date                     // Timestamp
  }],
  totalPrice: Number,                 // Auto-calculated
  totalItems: Number,                 // Auto-calculated
  lastUpdated: Date
}
```

## 🔄 Migration

Run the migration script to set up the new features:

```bash
node migrate-sellx.js
```

This will:

- Create necessary database indexes
- Set up new collections
- Update existing schema validations

## 🔍 Search & Filtering

### Product Search Features

- **Text Search**: Search across title, description, brand, model, and tags
- **Category Filtering**: Filter by specific categories
- **Price Range**: Min/max price filtering
- **Location-based**: Search within radius
- **Condition Filter**: New/Used/Refurbished
- **Brand Filter**: Filter by brand name

### Sorting Options

- Latest first (default)
- Price: Low to High / High to Low
- Most Popular (by view count)
- Best Selling (by sold count)

## 🚦 Usage Examples

### Creating a Product

```javascript
POST /api/items
{
  "productTitle": "iPhone 14 Pro Max",
  "productCategory": "Mobiles",
  "productDescription": "Excellent condition iPhone with all accessories",
  "price": 85000,
  "quantity": 1,
  "condition": "Used",
  "yearOfManufacture": 2022,
  "brand": "Apple",
  "model": "iPhone 14 Pro Max",
  "color": "Space Black",
  "originalPackaging": true,
  "manualIncluded": true,
  "location": {
    "lat": 28.6139,
    "lng": 77.2090,
    "address": "New Delhi, India"
  },
  "deliveryAvailable": true,
  "deliveryFee": 50
}
```

### Adding to Cart

```javascript
POST /api/cart/add
{
  "productId": "product_object_id",
  "quantity": 1
}
```

### Creating Order from Cart

```javascript
POST /api/orders/create-from-cart
{
  "deliveryType": "delivery",
  "deliveryAddress": "123 Main St, City, State",
  "notes": "Please handle with care"
}
```

## 🔐 Authentication

All cart and order operations require authentication. Product viewing is public, but creation requires authentication.

## 🔧 Integration Notes

- **Backward Compatibility**: All existing APIs remain functional
- **Dual Product Systems**: Both `SupplierListing` and `Product` models coexist
- **Unified Categories**: Categories updated across all models
- **Notification Integration**: Cart orders trigger seller notifications
- **Image Handling**: Supports multiple images via Cloudinary

## 📊 Analytics & Tracking

New tracking features added:

- Product view counts
- Sales tracking per product
- Cart abandonment (implicit)
- Popular products and categories

## 🛡️ Data Validation

Comprehensive validation added for:

- Required fields
- Price ranges (non-negative)
- Quantity limits
- Category validation
- Location data validation
- Image upload limits

This update transforms the VendorVerse backend into a comprehensive marketplace platform supporting diverse product categories while maintaining all existing functionality.
