import React, { useState } from 'react';
import { 
  EyeIcon, 
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const OrdersReceived = () => {
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    {
      id: 1,
      productName: 'aalu',
      quantity: '1 kg',
      buyer: 'John Updated',
      contact: '9049374399',
      orderDate: '9/6/2025',
      total: '₹25',
      delivery: 'pickup',
      status: 'Pending',
      notes: 'Order for 1 kg of aalu'
    },
    {
      id: 2,
      productName: 'tomato',
      quantity: '1 kg',
      buyer: 'Vikas',
      contact: '123569870',
      orderDate: '8/15/2025',
      total: '₹20',
      delivery: 'pickup',
      status: 'Completed',
      notes: 'Order for 1 kg of tomato'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'Pending').length },
    { id: 'confirmed', label: 'Confirmed', count: 0 },
    { id: 'processing', label: 'Processing', count: 0 },
    { id: 'shipped', label: 'Shipped', count: 0 },
    { id: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'Completed').length }
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

  const getDeliveryIcon = (delivery) => {
    return delivery === 'pickup' ? '🚶' : '🚛';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Received</h1>
          <p className="text-gray-600">Manage orders from your customers</p>
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
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{order.productName}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Quantity:</span>
                      <p className="font-medium">{order.quantity}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Buyer:</span>
                      <p className="font-medium">{order.buyer}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Order Date:</span>
                      <p className="font-medium">{order.orderDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Total:</span>
                      <p className="font-bold text-[#782355] text-lg">{order.total}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-gray-500">Contact:</span>
                      <p className="font-medium">{order.contact}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Delivery:</span>
                      <p className="flex items-center gap-1 font-medium">
                        <span>{getDeliveryIcon(order.delivery)}</span>
                        {order.delivery}
                      </p>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-500 text-sm">Notes:</span>
                      <p className="text-gray-700 text-sm mt-1">{order.notes}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
                  <button className="flex items-center justify-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                    <EyeIcon className="h-4 w-4" />
                    View Details
                  </button>
                  
                  {order.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                        <CheckCircleIcon className="h-4 w-4" />
                        Accept Order
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200">
                        <XCircleIcon className="h-4 w-4" />
                        Decline
                      </button>
                    </div>
                  )}
                  
                  {order.status === 'Completed' && (
                    <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      <ChatBubbleLeftRightIcon className="h-4 w-4" />
                      Chat
                    </button>
                  )}
                </div>
              </div>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600">Orders from customers will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersReceived;
