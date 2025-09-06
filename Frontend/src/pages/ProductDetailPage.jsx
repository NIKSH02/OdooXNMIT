import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, CalendarIcon, TagIcon, TruckIcon, ShieldCheckIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const ProductDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, selectedQuantity);
    navigate('/cart');
  };

  // Sample product data - In real app, this would come from props or API
  const product = {
    id: 1,
    title: "iPhone 13 Pro Max - 128GB",
    description: "Experience the latest Apple iPhone 13 Pro Max with advanced camera system, A15 Bionic chip, and stunning Super Retina XDR display. This device is in excellent condition with minimal signs of use.",
    price: 85000,
    originalPrice: 95000,
    condition: "Like New",
    location: "Mumbai, Maharashtra",
    yearOfManufacture: "2022",
    brand: "Apple",
    model: "iPhone 13 Pro Max",
    rating: 4.8,
    reviews: 156,
    category: "Electronics",
    seller: {
      name: "TechStore Mumbai",
      rating: 4.9,
      sales: 2340,
      verified: true
    },
    specifications: {
      color: "Pacific Blue",
      storage: "128GB",
      display: "6.7-inch Super Retina XDR",
      processor: "A15 Bionic chip",
      camera: "Pro 12MP camera system",
      battery: "Up to 28 hours video playback",
      weight: "240 grams",
      dimensions: "160.8 × 78.1 × 7.65 mm",
      connectivity: "5G, Wi-Fi 6, Bluetooth 5.0",
      operatingSystem: "iOS 15 (upgradable)"
    },
    features: [
      "ProRAW photography",
      "ProRes video recording",
      "Face ID",
      "Water resistant (IP68)",
      "MagSafe compatible",
      "Ceramic Shield front"
    ],
    images: [
      "https://images.unsplash.com/photo-1592286108767-df102fde88dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
      "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2063&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    availability: "In Stock",
    shipping: {
      freeShipping: true,
      deliveryTime: "2-3 business days",
      returnPolicy: "7 days return policy"
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
        
      {/* Back Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-[#782355] transition-colors duration-200"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            <span>Back to Products</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-all duration-200"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-all duration-200"
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'border-[#782355] shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <TagIcon className="h-4 w-4" />
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.brand}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

         
              
               
              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-[#782355]">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                    {discountPercentage}% off
                  </span>
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${
                    product.condition === 'New' ? 'bg-green-500' :
                    product.condition === 'Like New' ? 'bg-blue-500' :
                    product.condition === 'Good' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-gray-600">Condition:</span>
                  <span className="font-medium">{product.condition}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPinIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{product.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Year:</span>
                  <span className="font-medium">{product.yearOfManufacture}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Availability:</span>
                  <span className="font-medium text-green-600">{product.availability}</span>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium">{selectedQuantity}</span>
                    <button 
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-[#782355] to-[#9c3069] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#9c3069] hover:to-[#782355] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-white text-[#782355] py-3 px-6 rounded-xl font-semibold border-2 border-[#782355] hover:bg-[#782355] hover:text-white transition-all duration-300">
                    Send Request
                  </button>
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <HeartIcon className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>
              </div>

            

              {/* Seller Info */}
              
              
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="border-t border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
         
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
