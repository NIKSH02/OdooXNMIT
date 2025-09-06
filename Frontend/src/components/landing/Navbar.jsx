import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  ShoppingCartIcon, 
  UserIcon, 
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {

  const login = localStorage.getItem("accessToken");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  console.log('nav', isAuthenticated)

  const navigate = useNavigate();

    const handleLogout = async () => {
    try {
      await logout();
      // The AuthContext will handle clearing tokens and state
      // No need to reload - React will re-render with updated auth state
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-[#782355]">EcoFinds</h1>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:border-[#782355] focus:ring-1 focus:ring-[#782355]"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="flex items-center text-gray-700 hover:text-[#782355] transition-colors duration-200">
              <ShoppingCartIcon className="h-6 w-6 mr-1" />
              <span>Cart</span>
            </button>
            <button className="flex items-center text-gray-700 hover:text-[#782355] transition-colors duration-200">
              <UserIcon className="h-6 w-6 mr-1" />
              <span>Dashboard</span>
            </button>
             { isAuthenticated != true ? 
                (
                <button onClick={() => navigate('/authpage')} className="px-4 py-2 text-[#782355] border border-[#782355] rounded-lg hover:bg-[#782355] hover:text-white transition-colors duration-200">
                  Sign In
                </button>
                ) : (
                <button onClick={logout} className="px-4 py-2 text-[#782355] border border-[#782355] rounded-lg hover:bg-[#782355] hover:text-white transition-colors duration-200">
                  Logout
                </button>
                )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#782355] focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:border-[#782355] focus:ring-1 focus:ring-[#782355]"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-[#782355] hover:bg-gray-50 rounded-md transition-colors duration-200">
              <ShoppingCartIcon className="h-5 w-5 mr-3" />
              Cart
            </button>
            <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-[#782355] hover:bg-gray-50 rounded-md transition-colors duration-200">
              <UserIcon className="h-5 w-5 mr-3" />
              Dashboard
            </button>
            <div className="space-y-2 pt-2">
              { login != null ? 
                (
                <button onClick={() => navigate('/authpage')} className="px-4 py-2 text-[#782355] border border-[#782355] rounded-lg hover:bg-[#782355] hover:text-white transition-colors duration-200">
                  Sign In
                </button>):
                (
                <button onClick={handleLogout} className="px-4 py-2 text-[#782355] border border-[#782355] rounded-lg hover:bg-[#782355] hover:text-white transition-colors duration-200">
                  Logout
                </button>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
