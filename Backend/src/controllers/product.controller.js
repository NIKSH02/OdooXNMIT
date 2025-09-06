const Product = require("../models/Product.model");
const User = require("../models/User.model");
const asyncHandler = require("../utils/asynchandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const uploadOnCloudinary = require("../utils/cloudinary");

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
  const {
    productTitle,
    productCategory,
    productDescription,
    price,
    quantity = 1,
    condition = "New",
    yearOfManufacture,
    brand,
    model,
    dimensions,
    weight,
    material,
    color,
    originalPackaging = false,
    manualIncluded = false,
    workingConditionDescription,
    location,
    deliveryAvailable = false,
    deliveryFee = 0,
    tags,
    contactPreferences,
  } = req.body;

  const userId = req.user._id;

  // Validate required fields
  if (!productTitle || !productCategory || !price) {
    throw new ApiError(400, "Product title, category, and price are required");
  }

  // Parse location if sent as JSON string
  let parsedLocation = location;
  if (typeof location === "string") {
    try {
      parsedLocation = JSON.parse(location);
    } catch (e) {
      throw new ApiError(400, "Invalid location format");
    }
  }

  if (
    !parsedLocation ||
    !parsedLocation.lat ||
    !parsedLocation.lng ||
    !parsedLocation.address
  ) {
    throw new ApiError(400, "Location with lat, lng, and address is required");
  }

  let parsedDimensions = dimensions;
  if (typeof dimensions === "string") {
    try {
      parsedDimensions = JSON.parse(dimensions);
    } catch (e) {
      parsedDimensions = null;
    }
  }

  let parsedContactPreferences = contactPreferences;
  if (typeof contactPreferences === "string") {
    try {
      parsedContactPreferences = JSON.parse(contactPreferences);
    } catch (e) {
      parsedContactPreferences = null;
    }
  }

  let parsedTags = tags;
  if (typeof tags === "string") {
    try {
      parsedTags = JSON.parse(tags);
    } catch (e) {
      parsedTags = [];
    }
  }

  try {
    // Handle image upload
    let imageUrls = [];
    let imageDetails = [];

    if (req.files && req.files.images) {
      console.log("Files received:", Object.keys(req.files));
      console.log("Images:", req.files.images);
      
      const images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      console.log("Processing", images.length, "images");
      images.forEach((image, index) => {
        console.log(`Image ${index}:`, {
          name: image.name,
          size: image.size,
          mimetype: image.mimetype,
          dataLength: image.data ? image.data.length : 'undefined',
          tempFilePath: image.tempFilePath || 'undefined'
        });
      });

      // Upload images to Cloudinary
      // Use tempFilePath when useTempFiles is true, otherwise use data buffer
      const cloudinaryPromises = images.map((image) => {
        const fileSource = image.tempFilePath || image.data;
        return uploadOnCloudinary(fileSource, image.name);
      });
      const cloudinaryResponses = await Promise.all(cloudinaryPromises);

      imageUrls = cloudinaryResponses.map((response) => response.secure_url);
      imageDetails = cloudinaryResponses.map((response, index) => ({
        url: response.secure_url,
        publicId: response.public_id,
        format: response.format,
        size: response.bytes,
        isPrimary: index === 0,
      }));
    }

    const newProduct = new Product({
      userId,
      productTitle,
      productCategory,
      productDescription,
      price: Number(price),
      quantity: Number(quantity),
      condition,
      yearOfManufacture: yearOfManufacture
        ? Number(yearOfManufacture)
        : undefined,
      brand,
      model,
      dimensions: parsedDimensions,
      weight: weight ? Number(weight) : undefined,
      material,
      color,
      originalPackaging: Boolean(originalPackaging),
      manualIncluded: Boolean(manualIncluded),
      workingConditionDescription,
      imageUrl: imageUrls.length > 0 ? imageUrls[0] : undefined,
      imageUrls,
      imageDetails,
      location: parsedLocation,
      deliveryAvailable: Boolean(deliveryAvailable),
      deliveryFee: Number(deliveryFee),
      tags: parsedTags || [],
      contactPreferences: parsedContactPreferences,
    });

    const savedProduct = await newProduct.save();
    await savedProduct.populate("userId", "name username phone email");

    res
      .status(201)
      .json(new ApiResponse(201, savedProduct, "Product created successfully"));
  } catch (error) {
    throw new ApiError(500, `Error creating product: ${error.message}`);
  }
});

// Get all products with filtering and pagination
const getAllProducts = asyncHandler(async (req, res) => {
  const {
    productCategory,
    condition,
    minPrice,
    maxPrice,
    brand,
    location,
    radius = 10,
    page = 1,
    limit = 12,
    sortBy = "createdAt",
    sortOrder = "desc",
    search,
  } = req.query;

  // Build filter object
  const filter = { isActive: true };

  if (productCategory) {
    filter.productCategory = productCategory;
  }

  if (condition) {
    filter.condition = condition;
  }

  if (brand) {
    filter.brand = new RegExp(brand, "i");
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Location-based filtering (if provided)
  if (location) {
    try {
      const locationData = JSON.parse(location);
      if (locationData.lat && locationData.lng) {
        // Using simple distance calculation (can be improved with MongoDB geospatial queries)
        filter["location.lat"] = {
          $gte: locationData.lat - radius * 0.009, // Rough conversion
          $lte: locationData.lat + radius * 0.009,
        };
        filter["location.lng"] = {
          $gte: locationData.lng - radius * 0.009,
          $lte: locationData.lng + radius * 0.009,
        };
      }
    } catch (e) {
      // Invalid location format, ignore
    }
  }

  // Text search if search query provided
  if (search) {
    filter.$text = { $search: search };
  }

  const skip = (page - 1) * limit;
  const sort = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  const products = await Product.find(filter)
    .populate("userId", "name username rating")
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
      "Products retrieved successfully"
    )
  );
});

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const product = await Product.findById(id).populate(
    "userId",
    "name username phone email rating"
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Increment view count if user is not the owner
  if (!userId || product.userId._id.toString() !== userId.toString()) {
    await product.incrementViewCount();
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product retrieved successfully"));
});

// Get products by category
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const {
    page = 1,
    limit = 12,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const filter = { isActive: true, productCategory: category };
  const skip = (page - 1) * limit;
  const sort = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  const products = await Product.find(filter)
    .populate("userId", "name username rating")
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        category,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
      `Products in ${category} category retrieved successfully`
    )
  );
});

// Get user's own products
const getMyProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 12, productCategory, isActive } = req.query;
  const userId = req.user._id;

  const filter = { userId };
  if (productCategory) filter.productCategory = productCategory;
  if (isActive !== undefined) filter.isActive = isActive === "true";

  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
      "Your products retrieved successfully"
    )
  );
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only update your own products");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { ...req.body, lastUpdated: new Date() },
    { new: true, runValidators: true }
  ).populate("userId", "name username");

  res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

// Toggle product status (active/inactive)
const toggleProductStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only modify your own products");
  }

  product.isActive = !product.isActive;
  await product.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        product,
        `Product ${product.isActive ? "activated" : "deactivated"} successfully`
      )
    );
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only delete your own products");
  }

  await Product.findByIdAndDelete(id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getMyProducts,
  updateProduct,
  toggleProductStatus,
  deleteProduct,
};
