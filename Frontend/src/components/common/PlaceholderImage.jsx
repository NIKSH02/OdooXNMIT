import React from 'react';

const PlaceholderImage = ({ className = "w-full h-full", category = "general" }) => {
  // Different icons based on category
  const getIcon = () => {
    switch (category.toLowerCase()) {
      case 'electronics & appliances':
      case 'mobiles':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
            <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H7V6h10v10z"/>
          </svg>
        );
      case 'cars':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
        );
      case 'bikes':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
            <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm14.8-9.6l-1.8.7c-.3.1-.6 0-.8-.3L15.5 8.5l-.7.3c-.3.1-.6 0-.8-.3l-1.1-2.2c-.3-.6-.1-1.4.5-1.6l2.4-1c.5-.2 1.1 0 1.4.4l1.8 3.2c.2.4.1 1-.1 1.2z"/>
          </svg>
        );
      case 'furniture':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
            <path d="M7 11v2h10v-2H7zm0 6h10v-2H7v2zm5-14c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM7 6v1h10V6H7zm0 3v1h10V9H7z"/>
          </svg>
        );
      case 'fashion':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
            <path d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-.74L12 2z"/>
          </svg>
        );
      case 'books, sports & hobbies':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
          </svg>
        );
      case 'properties':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        );
    }
  };

  return (
    <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
      <div className="text-gray-400 flex flex-col items-center justify-center p-4">
        {getIcon()}
        <div className="mt-2 text-xs font-medium text-center">
          No Image
        </div>
      </div>
    </div>
  );
};

export default PlaceholderImage;
