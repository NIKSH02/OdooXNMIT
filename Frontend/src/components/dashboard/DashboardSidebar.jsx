import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  UserIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  DocumentCheckIcon,
  StarIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';

const DashboardSidebar = ({ user, onLogout, isMobile = false, onMobileClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const menuItems = [
    { 
      id: 'profile', 
      icon: UserIcon, 
      label: 'My Profile', 
      path: '/dashboard/profile',
      color: 'text-blue-600'
    },
    { 
      id: 'listings', 
      icon: ClipboardDocumentListIcon, 
      label: 'My Listings', 
      path: '/dashboard/listings',
      color: 'text-green-600'
    },
    { 
      id: 'orders-received', 
      icon: ShoppingBagIcon, 
      label: 'Orders Received', 
      path: '/dashboard/orders-received',
      color: 'text-orange-600'
    },
    { 
      id: 'orders-placed', 
      icon: DocumentCheckIcon, 
      label: 'My Purchases', 
      path: '/dashboard/orders-placed',
      color: 'text-purple-600'
    },
  
    { 
      id: 'notifications', 
      icon: BellIcon, 
      label: 'Notifications', 
      path: '/dashboard/notifications',
      color: 'text-red-600'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 lg:w-64 w-full max-w-xs bg-white shadow-lg h-screen overflow-y-auto">
      {/* Mobile Close Button */}
      {isMobile && (
        <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#782355]">Menu</h2>
          <button
            onClick={onMobileClose}
            className="p-2 text-gray-600 hover:text-[#782355] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActiveRoute(item.path)
                    ? 'bg-[#782355] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`h-5 w-5 ${
                  isActiveRoute(item.path) ? 'text-white' : item.color
                }`} />
                <span className="font-medium text-sm lg:text-base">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 mt-auto border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span className="font-medium text-sm lg:text-base">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
