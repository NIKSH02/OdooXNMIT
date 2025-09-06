import React, { useState } from 'react';
import { AdjustmentsHorizontalIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

const ExploreItems = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const categories = ['All', 'Electronics', 'Furniture', 'Fashion', 'Sports', 'Books', 'Bikes'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  // Sample products data
  const products = [
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
    }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  );

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore Items
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products from our community
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters & Sort
            </button>
          </div>

          {/* Filters Container */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-6 bg-gray-50 rounded-xl">
              {/* Categories */}
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
                  Categories:
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-[#782355] text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#782355] focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/products')}
            className="inline-flex items-center px-8 py-4 bg-[#782355] text-white font-semibold rounded-xl hover:bg-[#8e2a63] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <span>Show More Items</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreItems;
