import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import ProfilePage from './ProfilePage';
import ListingsPage from './ListingsPage';
import OrdersReceivedPage from './OrdersReceivedPage';
import OrdersPlacedPage from './OrdersPlacedPage';
import NotificationsPage from './NotificationsPage';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user] = useState({
    name: 'John Updated',
    email: 'ysumesh084@gmail.com',
    profileImage: null
  });

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 relative">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {/* Sidebar - Hidden on mobile by default, shown when menu is open */}
        <div className={`
          fixed lg:relative lg:translate-x-0 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          transition-transform duration-300 ease-in-out z-50 lg:z-auto
        `}>
          <DashboardSidebar 
            user={user} 
            onLogout={handleLogout}
            isMobile={true}
            onMobileClose={() => setIsMobileMenuOpen(false)}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto lg:ml-0">
          {/* Mobile Menu Button */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-[#782355] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <Routes>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="orders-received" element={<OrdersReceivedPage />} />
            <Route path="orders-placed" element={<OrdersPlacedPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
