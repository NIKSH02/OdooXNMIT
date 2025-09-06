import React, { useState } from 'react';
import { StarIcon, EyeIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import PlaceholderImage from '../common/PlaceholderImage';

const ProductCard = ({ product, onViewDetails }) => {
  const [imageError, setImageError] = useState(false);
  const {
    image,
    title,
    description,
    price,
    originalPrice,
    condition,
    location,
    yearOfManufacture,
    brand,
    rating,
    reviews,
    category,
    isNew,
    seller
  } = product;

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {image && !imageError ? (
          <img
            src={image}
            alt={title}
            onError={() => setImageError(true)}
            className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <PlaceholderImage 
            className="w-full h-48 md:h-56" 
            category={category}
          />
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              New
            </span>
          )}
          {discountPercentage && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onViewDetails(product)}
            className="bg-white/90 backdrop-blur-sm text-[#782355] p-2 rounded-full hover:bg-white transition-colors duration-200"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Condition Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            condition === 'New' 
              ? 'bg-green-100 text-green-800'
              : condition === 'Like New'
              ? 'bg-blue-100 text-blue-800'
              : condition === 'Good'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {condition}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Category & Location */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center">
            <TagIcon className="h-3 w-3 mr-1" />
            {category}
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-3 w-3 mr-1" />
            {location}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-2 line-clamp-2 group-hover:text-[#782355] transition-colors duration-200">
          {title}
        </h3>

      
     

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold text-[#782355]">
              ₹{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Seller Info */}
        {seller && (
          <div className="text-xs text-gray-500 mb-4">
            Sold by: <span className="font-medium">{seller}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(product)}
          className="w-full bg-[#782355] text-white py-2 md:py-3 rounded-lg font-medium hover:bg-[#8e2a63] transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
