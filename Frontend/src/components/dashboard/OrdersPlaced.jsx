import React, { useState } from 'react';
import { 
  ChatBubbleLeftRightIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const OrdersPlaced = () => {
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    {
      id: 1,
      productName: 'Wheat',
      quantity: '1 kg',
      supplier: 'Vikas',
      phone: '123569870',
      delivery: 'pickup',
      expected: '9/9/2025',
      ordered: '9/6/2025',
      total: '₹38',
      status: 'Completed'
    },
    {
      id: 2,
      productName: 'aalu',
      quantity: '1 kg',
      supplier: 'John Updated',
      phone: '9049374399',
      delivery: 'pickup',
      expected: '9/9/2025',
      ordered: '9/6/2025',
      total: '₹25',
      status: 'Pending'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'Pending').length },
    { id: 'confirmed', label: 'Confirmed', count: 0 },
    { id: 'processing', label: 'Processing', count: 0 },
    { id: 'shipped', label: 'Shipped', count: 0 },
    { id: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'Completed').length },
    { id: 'cancelled', label: 'Cancelled', count: 0 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-purple-100 text-purple-800';
      case 'Shipped': return 'bg-indigo-100 text-indigo-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return '⏳';
      case 'Confirmed': return '✅';
      case 'Processing': return '⚙️';
      case 'Shipped': return '🚚';
      case 'Completed': return '🎉';
      case 'Cancelled': return '❌';
      default: return '📦';
    }
  };

  const getDeliveryIcon = (delivery) => {
    return delivery === 'pickup' ? '🚶' : '🚛';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Purchases</h1>
          <p className="text-gray-600">Track your orders and purchases</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
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

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{order.productName}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Order Details */}
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-500 text-sm">Quantity:</span>
                          <p className="font-semibold text-gray-900">{order.quantity}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Supplier:</span>
                          <p className="font-semibold text-gray-900">{order.supplier}</p>
                        </div>
                      </div>

                      {/* Contact & Delivery */}
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-500 text-sm">Phone:</span>
                          <p className="font-semibold text-gray-900">{order.phone}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Delivery:</span>
                          <p className="flex items-center gap-2 font-semibold text-gray-900">
                            <span>{getDeliveryIcon(order.delivery)}</span>
                            {order.delivery}
                          </p>
                        </div>
                      </div>

                      {/* Dates & Total */}
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-500 text-sm">Expected:</span>
                          <p className="font-semibold text-gray-900">{order.expected}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Ordered:</span>
                          <p className="font-semibold text-gray-900">{order.ordered}</p>
                        </div>
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-[#782355]/10 to-purple-600/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Total Amount:</span>
                        <span className="text-2xl font-bold text-[#782355]">{order.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 lg:min-w-[160px]">
                    {order.status === 'Completed' && (
                      <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        <ChatBubbleLeftRightIcon className="h-5 w-5" />
                        Chat
                      </button>
                    )}
                    
                    {order.status === 'Pending' && (
                      <button className="flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200">
                        <XCircleIcon className="h-5 w-5" />
                        Cancel Order
                      </button>
                    )}

                    {(order.status === 'Completed' || order.status === 'Shipped') && (
                      <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                        ⭐ Rate & Review
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar for Active Orders */}
              {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Order Progress</span>
                    <span>{order.status}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#782355] to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: order.status === 'Pending' ? '25%' : 
                               order.status === 'Confirmed' ? '50%' : 
                               order.status === 'Processing' ? '75%' : 
                               order.status === 'Shipped' ? '90%' : '100%' 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Placed</span>
                    <span>Confirmed</span>
                    <span>Processing</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders placed yet</h3>
            <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
            <button className="bg-[#782355] text-white px-6 py-3 rounded-lg hover:bg-[#8e2a63] transition-colors duration-200">
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPlaced;
