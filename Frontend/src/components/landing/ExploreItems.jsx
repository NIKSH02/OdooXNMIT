import React, { useState, useEffect } from 'react';
import { AdjustmentsHorizontalIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import productService from '../../services/productService';
import { useRetry } from '../../hooks/useUtils';
import { useAuth } from '../../hooks/useAuth';

const ExploreItems = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { retryCount, canRetry, retry, reset } = useRetry();
  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = [
    'All', 
    'Electronics & Appliances', 
    'Furniture', 
    'Fashion', 
    'Books, Sports & Hobbies', 
    'Bikes',
    'Mobiles',
    'Cars'
  ];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {
          limit: 8, // Show only 8 products on landing page
          sortBy: sortBy === 'featured' ? 'viewCount' : 
                 sortBy === 'price-low' ? 'price' :
                 sortBy === 'price-high' ? 'price' :
                 sortBy === 'newest' ? 'createdAt' : 'viewCount',
          sortOrder: sortBy === 'price-high' ? 'desc' : 
                    sortBy === 'newest' ? 'desc' : 
                    sortBy === 'featured' ? 'desc' : 'asc'
        };

        if (selectedCategory !== 'All') {
          params.productCategory = selectedCategory;
        }

        const response = await productService.getAllProducts(params);
        
        // Filter out products where the seller is the current user
        let filteredProducts = response.data.products || [];
        if (user && user._id) {
          filteredProducts = filteredProducts.filter(product => 
            product.userId?._id !== user._id && product.userId !== user._id
          );
        }
        
        setProducts(filteredProducts);
        reset(); // Reset retry count on successful fetch
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || 'Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, sortBy, retryCount, reset, user]);

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id || product._id}`);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Explore Items
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing products from our community
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#782355]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Explore Items
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing products from our community
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => {
                setError(null);
                retry();
              }}
              disabled={!canRetry}
              className="bg-[#782355] text-white px-6 py-2 rounded-lg hover:bg-[#8e2a63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {canRetry ? 'Try Again' : 'Max Retries Reached'}
            </button>
          </div>
        </div>
      </section>
    );
  }

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
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  image: product.imageUrls?.[0] || product.imageUrl,
                  title: product.productTitle,
                  description: product.productDescription,
                  price: product.price,
                  condition: product.condition,
                  location: product.location?.address || 'Location not specified',
                  yearOfManufacture: product.yearOfManufacture,
                  brand: product.brand,
                  category: product.productCategory,
                  seller: product.userId?.name || 'Unknown Seller'
                }}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          )}
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
