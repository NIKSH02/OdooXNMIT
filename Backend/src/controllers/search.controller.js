const Product = require("../models/Product.model");
const SupplierListing = require("../models/SupplierListing.model");
const User = require("../models/User.model");
const asyncHandler = require("../utils/asynchandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

// Search across products and supplier listings
const searchItems = asyncHandler(async (req, res) => {
  const { query, category, minPrice, maxPrice, condition, location } = req.query;

  if (!query || query.trim().length === 0) {
    throw new ApiError(400, "Search query is required");
  }

  try {
    // Build search criteria
    const searchCriteria = {
      $or: [
        { productTitle: { $regex: query, $options: "i" } },
        { productDescription: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
        { material: { $regex: query, $options: "i" } },
        { color: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } }
      ]
    };

    // Add optional filters
    if (category && category !== 'all') {
      searchCriteria.productCategory = category;
    }

    if (condition && condition !== 'all') {
      searchCriteria.condition = condition;
    }

    if (minPrice || maxPrice) {
      searchCriteria.price = {};
      if (minPrice) searchCriteria.price.$gte = parseInt(minPrice);
      if (maxPrice) searchCriteria.price.$lte = parseInt(maxPrice);
    }

    if (location) {
      searchCriteria.location = { $regex: location, $options: "i" };
    }

    // Search in Product collection (Sellx items)
    const products = await Product.find(searchCriteria)
      .populate('userId', 'username email profileImage')
      .sort({ createdAt: -1 })
      .limit(50);

    // Search in SupplierListing collection  
    const supplierSearchCriteria = {
      $or: [
        { itemName: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { unit: { $regex: query, $options: "i" } }
      ]
    };

    // Add optional filters for supplier listings
    if (category && category !== 'all') {
      supplierSearchCriteria.category = category;
    }

    if (minPrice || maxPrice) {
      supplierSearchCriteria.pricePerUnit = {};
      if (minPrice) supplierSearchCriteria.pricePerUnit.$gte = parseInt(minPrice);
      if (maxPrice) supplierSearchCriteria.pricePerUnit.$lte = parseInt(maxPrice);
    }

    const supplierListings = await SupplierListing.find(supplierSearchCriteria)
      .populate('userId', 'username email profileImage')
      .sort({ createdAt: -1 })
      .limit(50);

    // Combine results and add source identifier
    const combinedResults = [
      ...products.map(item => ({
        ...item.toObject(),
        source: 'product',
        type: 'Sellx Item'
      })),
      ...supplierListings.map(item => ({
        ...item.toObject(),
        source: 'supplier',
        type: 'Supplier Listing'
      }))
    ];

    // Sort combined results by creation date
    combinedResults.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          results: combinedResults,
          totalCount: combinedResults.length,
          productCount: products.length,
          supplierListingCount: supplierListings.length,
          query: query,
          filters: {
            category: category || null,
            condition: condition || null,
            minPrice: minPrice || null,
            maxPrice: maxPrice || null,
            location: location || null
          }
        },
        "Search completed successfully"
      )
    );

  } catch (error) {
    console.error("Search error:", error);
    throw new ApiError(500, "An error occurred while searching");
  }
});

// Get search suggestions based on partial query
const getSearchSuggestions = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim().length < 2) {
    return res.status(200).json(
      new ApiResponse(200, { suggestions: [] }, "No suggestions available")
    );
  }

  try {
    // Get suggestions from product titles, brands, and categories
    const productSuggestions = await Product.aggregate([
      {
        $match: {
          $or: [
            { productTitle: { $regex: query, $options: "i" } },
            { brand: { $regex: query, $options: "i" } },
            { productCategory: { $regex: query, $options: "i" } }
          ]
        }
      },
      {
        $group: {
          _id: null,
          titles: { $addToSet: "$productTitle" },
          brands: { $addToSet: "$brand" },
          categories: { $addToSet: "$productCategory" }
        }
      }
    ]);

    const supplierSuggestions = await SupplierListing.aggregate([
      {
        $match: {
          $or: [
            { itemName: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            { unit: { $regex: query, $options: "i" } }
          ]
        }
      },
      {
        $group: {
          _id: null,
          itemNames: { $addToSet: "$itemName" },
          categories: { $addToSet: "$category" },
          units: { $addToSet: "$unit" }
        }
      }
    ]);

    // Combine and filter suggestions
    let allSuggestions = [];
    
    if (productSuggestions.length > 0) {
      allSuggestions = [
        ...productSuggestions[0].titles.filter(title => title && title.toLowerCase().includes(query.toLowerCase())),
        ...productSuggestions[0].brands.filter(brand => brand && brand.toLowerCase().includes(query.toLowerCase())),
        ...productSuggestions[0].categories.filter(cat => cat && cat.toLowerCase().includes(query.toLowerCase()))
      ];
    }

    if (supplierSuggestions.length > 0) {
      allSuggestions = [
        ...allSuggestions,
        ...supplierSuggestions[0].itemNames.filter(name => name && name.toLowerCase().includes(query.toLowerCase())),
        ...supplierSuggestions[0].categories.filter(cat => cat && cat.toLowerCase().includes(query.toLowerCase())),
        ...supplierSuggestions[0].units.filter(unit => unit && unit.toLowerCase().includes(query.toLowerCase()))
      ];
    }

    // Remove duplicates and limit to 10 suggestions
    const uniqueSuggestions = [...new Set(allSuggestions)].slice(0, 10);

    return res.status(200).json(
      new ApiResponse(200, { suggestions: uniqueSuggestions }, "Suggestions retrieved successfully")
    );

  } catch (error) {
    console.error("Suggestions error:", error);
    throw new ApiError(500, "An error occurred while getting suggestions");
  }
});

// Get popular search terms
const getPopularSearches = asyncHandler(async (req, res) => {
  try {
    // Get most common product categories and brands
    const popularProductCategories = await Product.aggregate([
      { $group: { _id: "$productCategory", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const popularProductBrands = await Product.aggregate([
      { $match: { brand: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: "$brand", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Get popular supplier listing categories and items
    const popularSupplierCategories = await SupplierListing.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const popularSupplierItems = await SupplierListing.aggregate([
      { $group: { _id: "$itemName", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          popularProductCategories: popularProductCategories.map(item => item._id),
          popularProductBrands: popularProductBrands.map(item => item._id),
          popularSupplierCategories: popularSupplierCategories.map(item => item._id),
          popularSupplierItems: popularSupplierItems.map(item => item._id)
        },
        "Popular searches retrieved successfully"
      )
    );

  } catch (error) {
    console.error("Popular searches error:", error);
    throw new ApiError(500, "An error occurred while getting popular searches");
  }
});

module.exports = {
  searchItems,
  getSearchSuggestions,
  getPopularSearches
};
