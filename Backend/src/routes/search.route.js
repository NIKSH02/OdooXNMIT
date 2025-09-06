const express = require("express");
const {
  searchItems,
  getSearchSuggestions,
  getPopularSearches
} = require("../controllers/search.controller");

const router = express.Router();

// Search route - GET /api/search
router.get("/", searchItems);

// Search suggestions route - GET /api/search/suggestions
router.get("/suggestions", getSearchSuggestions);

// Popular searches route - GET /api/search/popular
router.get("/popular", getPopularSearches);

module.exports = router;
