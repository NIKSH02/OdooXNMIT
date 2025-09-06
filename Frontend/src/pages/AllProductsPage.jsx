import React, { useState, useEffect } from 'react';
import { 
  AdjustmentsHorizontalIcon, 
  FunnelIcon, 
  XMarkIcon,
  ChevronDownIcon,
  ChevronLeftIcon 
} from '@heroicons/react/24/outline';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/landing/ProductCard';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const AllProductsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get category from URL params
  const categoryFromUrl = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Update selected category when URL changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const categories = ['All', 'Electronics', 'Furniture', 'Fashion', 'Sports', 'Books', 'Sports & Books', 'Bikes'];
  const conditions = ['All', 'New', 'Like New', 'Good', 'Fair'];
  const locations = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'distance', label: 'Nearest to Me' }
  ];

  // Extended sample products data
  const allProducts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1464&q=80",
      title: "iPhone 13 Pro Max",
      description: "Latest Apple iPhone with advanced camera system and A15 Bionic chip",
      price: 85000,
      originalPrice: 95000,
      condition: "Like New",
      location: "Mumbai",
      yearOfManufacture: "2022",
      brand: "Apple",
      rating: 4.8,
      reviews: 156,
      category: "Electronics",
      isNew: false,
      seller: "TechStore Mumbai"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
      title: "Modern Office Chair",
      description: "Ergonomic office chair with lumbar support and adjustable height",
      price: 12000,
      originalPrice: 15000,
      condition: "Good",
      location: "Delhi",
      yearOfManufacture: "2021",
      brand: "Herman Miller",
      rating: 4.5,
      reviews: 89,
      category: "Furniture",
      isNew: false,
      seller: "Furniture World"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Nike Air Max 270",
      description: "Comfortable running shoes with maximum air cushioning",
      price: 8500,
      originalPrice: null,
      condition: "New",
      location: "Bangalore",
      yearOfManufacture: "2023",
      brand: "Nike",
      rating: 4.7,
      reviews: 234,
      category: "Fashion",
      isNew: true,
      seller: "SportZone"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "MacBook Pro M2",
      description: "Apple MacBook Pro with M2 chip, 16GB RAM, 512GB SSD",
      price: 185000,
      originalPrice: 200000,
      condition: "Like New",
      location: "Pune",
      yearOfManufacture: "2023",
      brand: "Apple",
      rating: 4.9,
      reviews: 67,
      category: "Electronics",
      isNew: false,
      seller: "Apple Store"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Mountain Bike Trek",
      description: "Professional mountain bike with 21-speed gear system",
      price: 45000,
      originalPrice: 50000,
      condition: "Good",
      location: "Chennai",
      yearOfManufacture: "2022",
      brand: "Trek",
      rating: 4.6,
      reviews: 45,
      category: "Bikes",
      isNew: false,
      seller: "Cycle World"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Dining Table Set",
      description: "6-seater wooden dining table with chairs",
      price: 35000,
      originalPrice: 42000,
      condition: "Good",
      location: "Hyderabad",
      yearOfManufacture: "2021",
      brand: "IKEA",
      rating: 4.4,
      reviews: 78,
      category: "Furniture",
      isNew: false,
      seller: "Home Decor"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Samsung Galaxy S23",
      description: "Latest Samsung flagship with incredible camera and performance",
      price: 65000,
      originalPrice: 75000,
      condition: "New",
      location: "Mumbai",
      yearOfManufacture: "2023",
      brand: "Samsung",
      rating: 4.7,
      reviews: 198,
      category: "Electronics",
      isNew: true,
      seller: "Mobile Hub"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Beats Studio Buds",
      description: "Wireless noise-cancelling earbuds with spatial audio",
      price: 12000,
      originalPrice: 15000,
      condition: "Like New",
      location: "Delhi",
      yearOfManufacture: "2022",
      brand: "Beats",
      rating: 4.5,
      reviews: 312,
      category: "Electronics",
      isNew: false,
      seller: "Audio Pro"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Football & Soccer Ball",
      description: "Professional quality football for outdoor sports",
      price: 1500,
      originalPrice: 2000,
      condition: "Good",
      location: "Mumbai",
      yearOfManufacture: "2022",
      brand: "Nike",
      rating: 4.3,
      reviews: 85,
      category: "Sports",
      isNew: false,
      seller: "Sports Arena"
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Basketball Premium",
      description: "High-quality basketball for professional games",
      price: 2500,
      originalPrice: 3000,
      condition: "Like New",
      location: "Bangalore",
      yearOfManufacture: "2023",
      brand: "Spalding",
      rating: 4.6,
      reviews: 124,
      category: "Sports",
      isNew: false,
      seller: "Court Masters"
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Programming Books Set",
      description: "Collection of programming books including JavaScript, Python, React",
      price: 3500,
      originalPrice: 5000,
      condition: "Good",
      location: "Delhi",
      yearOfManufacture: "2021",
      brand: "O'Reilly",
      rating: 4.8,
      reviews: 67,
      category: "Books",
      isNew: false,
      seller: "BookWorm"
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Classic Literature Collection",
      description: "Set of classic literature books including Shakespeare, Dickens",
      price: 2800,
      originalPrice: 4000,
      condition: "Good",
      location: "Chennai",
      yearOfManufacture: "2020",
      brand: "Penguin Classics",
      rating: 4.7,
      reviews: 92,
      category: "Books",
      isNew: false,
      seller: "Classic Reads"
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    let categoryMatch = false;
    
    if (selectedCategory === 'All') {
      categoryMatch = true;
    } else if (selectedCategory === 'Sports & Books') {
      // Handle the combined category from ExploreCategories
      categoryMatch = product.category === 'Sports' || product.category === 'Books';
    } else {
      categoryMatch = product.category === selectedCategory;
    }
    
    const conditionMatch = selectedCondition === 'All' || product.condition === selectedCondition;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const locationMatch = selectedLocation === 'All' || product.location.includes(selectedLocation);
    
    return categoryMatch && conditionMatch && priceMatch && locationMatch;
  });

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedCondition('All');
    setPriceRange([0, 200000]);
    setSelectedLocation('All');
    setSortBy('featured');
    // Clear URL parameters
    navigate('/products', { replace: true });
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Navigation */}
          <div className="mb-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-[#782355] transition-colors duration-200"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-2" />
              <span>Back to Home</span>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">All Products</h1>
              <p className="text-gray-600 mt-1">{filteredProducts.length} products found</p>
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center bg-[#782355] text-white px-4 py-2 rounded-lg"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block fixed lg:static inset-0 lg:inset-auto z-50 lg:z-auto bg-black/50 lg:bg-transparent`}>
            <div className="bg-white lg:bg-transparent h-full lg:h-auto w-80 lg:w-64 overflow-y-auto lg:overflow-visible">
              <div className="p-6 lg:p-0">
                {/* Mobile Close Button */}
                <div className="lg:hidden flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="bg-white lg:bg-white rounded-xl lg:rounded-none p-6 lg:p-0 shadow-lg lg:shadow-none">
                  <div className="hidden lg:flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold flex items-center">
                      <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                      Filters
                    </h3>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-[#782355] hover:underline"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Category Filter */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label key={category} className="flex items-center">
                            <input
                              type="radio"
                              name="category"
                              value={category}
                              checked={selectedCategory === category}
                              onChange={(e) => setSelectedCategory(e.target.value)}
                              className="mr-3 text-[#782355] focus:ring-[#782355]"
                            />
                            <span className="text-gray-700">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Condition Filter */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Condition</h4>
                      <div className="space-y-2">
                        {conditions.map((condition) => (
                          <label key={condition} className="flex items-center">
                            <input
                              type="radio"
                              name="condition"
                              value={condition}
                              checked={selectedCondition === condition}
                              onChange={(e) => setSelectedCondition(e.target.value)}
                              className="mr-3 text-[#782355] focus:ring-[#782355]"
                            />
                            <span className="text-gray-700">{condition}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            placeholder="Min"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#782355]"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200000])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#782355]"
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Location</h4>
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#782355]"
                      >
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Apply Filters Button (Mobile) */}
                    <div className="lg:hidden pt-4">
                      <button
                        onClick={() => setShowFilters(false)}
                        className="w-full bg-[#782355] text-white py-3 rounded-lg font-semibold"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#782355]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Showing {filteredProducts.length} of {allProducts.length} products</span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09M6.343 6.343A8 8 0 1017.657 17.657 8 8 0 006.343 6.343z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
                <button
                  onClick={clearFilters}
                  className="bg-[#782355] text-white px-6 py-2 rounded-lg hover:bg-[#8e2a63] transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-[#782355] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#8e2a63] transition-colors duration-200">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
