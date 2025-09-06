import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusIcon, 
  ArrowPathIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const MyListings = () => {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  const stats = [
    { title: 'Total Products', value: 4, color: 'bg-blue-500', icon: '📦' },
    { title: 'Active Listings', value: 4, color: 'bg-green-500', icon: '✅' },
    { title: 'Total Stock', value: 310, color: 'bg-purple-500', icon: '👁️' },
    { title: 'Product Types', value: 2, color: 'bg-orange-500', icon: '🏷️' }
  ];

  const products = [
    {
      id: 1,
      name: 'tomato',
      category: 'Vegetables',
      price: '₹20/kg',
      description: 'Fresh Tomato and organic.',
      stock: '100 kg',
      addedDate: '7/28/2025',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1546470810-4a3b65e0b8b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      delivery: 'Delivery'
    },
    {
      id: 2,
      name: 'complete',
      category: 'Other',
      price: '₹10/kg',
      description: 'complete',
      stock: '10 kg',
      addedDate: '7/28/2025',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      delivery: 'Delivery'
    },
    {
      id: 3,
      name: 'chaas',
      category: 'Other',
      price: '₹12/kg',
      description: 'thanda',
      stock: '100 kg',
      addedDate: '7/27/2025',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      delivery: 'Delivery'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All', count: products.length },
    { id: 'active', label: 'Active', count: products.filter(p => p.status === 'Active').length },
    { id: 'inactive', label: 'Inactive', count: 0 },
    { id: 'sold', label: 'Sold Out', count: 0 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Sold': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
            <p className="text-gray-600">Manage your product listings and inventory</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200">
              <ArrowPathIcon className="h-4 w-4" />
              Refresh
            </button>
            <button 
              onClick={() => navigate('/add-item')}
              className="flex items-center gap-2 bg-[#782355] text-white px-4 py-2 rounded-lg hover:bg-[#8e2a63] transition-colors duration-200"
            >
              <PlusIcon className="h-4 w-4" />
              Add New Product
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#782355] text-[#782355]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                  <span className="text-lg font-bold text-[#782355]">{product.price}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Stock:</span>
                    <span className="font-medium">{product.stock}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Added:</span>
                    <span className="font-medium">{product.addedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Delivery:</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {product.delivery}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                    <EyeIcon className="h-4 w-4" />
                    View Details
                  </button>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button className="flex items-center justify-center gap-1 bg-[#782355] text-white py-2 rounded-lg  transition-colors duration-200">
                      <PencilIcon className="h-4 w-4" />
                      <span className="text-xs">Edit</span>
                    </button>
                  
                    <button className="flex items-center justify-center gap-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-200">
                      <TrashIcon className="h-4 w-4" />
                      <span className="text-xs">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Start selling by adding your first product</p>
            <button className="bg-[#782355] text-white px-6 py-3 rounded-lg hover:bg-[#8e2a63] transition-colors duration-200">
              Add Your First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
