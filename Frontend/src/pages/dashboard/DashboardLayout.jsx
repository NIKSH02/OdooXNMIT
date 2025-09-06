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
      <div className="flex flex-1">
        <DashboardSidebar user={user} onLogout={handleLogout} />
        <div className="flex-1 overflow-auto">
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
