import React, { useState } from 'react';
import { 
  BellIcon,
  ArrowPathIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Completed',
      message: 'Your order for Wheat has been completed. Please leave a review!',
      time: '3h ago',
      isRead: false,
      priority: 'normal',
      icon: '📦'
    },
    {
      id: 2,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order for Wheat has been shipped and is on the way',
      time: '3h ago',
      isRead: false,
      priority: 'normal',
      icon: '🚚'
    },
    {
      id: 3,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order for Wheat has been confirmed by the seller',
      time: '3h ago',
      isRead: false,
      priority: 'normal',
      icon: '✅'
    },
    {
      id: 4,
      type: 'order',
      title: 'New Order Received',
      message: 'You have received a new order for aalu (1 kg)',
      time: '3h ago',
      isRead: false,
      priority: 'high',
      icon: '🛒'
    },
    {
      id: 5,
      type: 'review',
      title: 'New Review Received',
      message: 'You received a 4-star review from undefined',
      time: '19d ago',
      isRead: true,
      priority: 'normal',
      icon: '⭐'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All', count: 12 },
    { id: 'unread', label: 'Unread', count: 0 },
    { id: 'orders', label: 'Orders', count: 10 },
    { id: 'delivery', label: 'Delivery', count: 1 },
    { id: 'reviews', label: 'Reviews', count: 4 },
    { id: 'messages', label: 'Messages', count: 2 }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'order': return 'text-green-600';
      case 'review': return 'text-yellow-600';
      case 'message': return 'text-blue-600';
      case 'delivery': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#782355] to-purple-600 rounded-full flex items-center justify-center">
              <BellIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Stay updated with your latest activities</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200">
              <ArrowPathIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button className="text-[#782355] hover:text-[#8e2a63] font-medium">
              Clear all
            </button>
          </div>
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

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`bg-white rounded-xl border-l-4 p-6 shadow-sm hover:shadow-md transition-all duration-200 ${
                getPriorityColor(notification.priority)
              } ${!notification.isRead ? 'ring-2 ring-blue-100' : ''}`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                    <span className="text-xl">{notification.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-[#782355] rounded-full"></div>
                        )}
                        {notification.priority === 'high' && (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                            HIGH
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${getTypeColor(notification.type)} bg-current`}></span>
                          {notification.type}
                        </span>
                        <span>{notification.time}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons for specific notification types */}
              {notification.type === 'order' && notification.title.includes('New Order') && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                    Accept Order
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm">
                    View Details
                  </button>
                </div>
              )}

              {notification.type === 'order' && notification.title.includes('Completed') && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="bg-[#782355] text-white px-4 py-2 rounded-lg hover:bg-[#8e2a63] transition-colors duration-200 text-sm">
                    Leave Review
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BellIcon className="mx-auto h-16 w-16" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! New notifications will appear here.</p>
          </div>
        )}

        {/* Load More */}
        {notifications.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-[#782355] text-white px-6 py-3 rounded-lg hover:bg-[#8e2a63] transition-colors duration-200">
              Load More Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
