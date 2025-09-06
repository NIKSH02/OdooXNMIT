// Order Service API
import apiClient from '../api/axios';

export const orderService = {
  // Place a new order
  placeOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/orders/place', orderData);
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error.response?.data || error;
    }
  },

  // Create order from cart
  createOrderFromCart: async (orderData) => {
    try {
      const response = await apiClient.post('/orders/create-from-cart', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order from cart:', error);
      throw error.response?.data || error;
    }
  },

  // Get buyer's order history (orders placed)
  getBuyerOrderHistory: async (page = 1, limit = 10, status = '') => {
    try {
      const params = { page, limit };
      if (status) params.status = status;
      
      const response = await apiClient.get('/orders/buyer/history', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching buyer order history:', error);
      throw error.response?.data || error;
    }
  },

  // Get seller's orders (orders to fulfill)
  getSellerOrders: async (page = 1, limit = 10, status = '') => {
    try {
      const params = { page, limit };
      if (status) params.status = status;
      
      const response = await apiClient.get('/orders/seller/orders', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching seller orders:', error);
      throw error.response?.data || error;
    }
  },

  // Get all orders for user (both buyer & seller)
  getAllUserOrders: async (page = 1, limit = 10, type = 'all') => {
    try {
      const params = { page, limit, type }; // type: 'buyer', 'seller', 'all'
      
      const response = await apiClient.get('/orders/all', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching all user orders:', error);
      throw error.response?.data || error;
    }
  },

  // Get orders that can be reviewed
  getReviewableOrders: async () => {
    try {
      const response = await apiClient.get('/orders/reviewable');
      return response.data;
    } catch (error) {
      console.error('Error fetching reviewable orders:', error);
      throw error.response?.data || error;
    }
  },

  // Update order status (accept, process, ship, complete, cancel)
  updateOrderStatus: async (orderId, payload, notes = '') => {
    try {
      // Handle both old format (action, notes) and new format (payload object)
      let data;
      if (typeof payload === 'string') {
        // Old format: updateOrderStatus(orderId, action, notes)
        data = { action: payload };
        if (notes) data.notes = notes;
      } else {
        // New format: updateOrderStatus(orderId, { action, notes })
        data = payload;
      }
      
      const response = await apiClient.patch(`/orders/${orderId}/status`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error.response?.data || error;
    }
  },

  // Cancel order (buyer only)
  cancelOrder: async (orderId, reason = '') => {
    try {
      const data = { reason };
      const response = await apiClient.patch(`/orders/${orderId}/cancel`, data);
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error.response?.data || error;
    }
  },

  // Get exchange code (buyer)
  getExchangeCode: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}/exchange-code`);
      return response.data;
    } catch (error) {
      console.error('Error getting exchange code:', error);
      throw error.response?.data || error;
    }
  },

  // Get order details
  getOrderDetails: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error.response?.data || error;
    }
  },

  // Get order dashboard/summary
  getOrderDashboard: async () => {
    try {
      const response = await apiClient.get('/orders/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching order dashboard:', error);
      throw error.response?.data || error;
    }
  },

  // Get financial summary for profile
  getFinancialSummary: async () => {
    try {
      const response = await apiClient.get('/orders/financial/summary');
      return response.data;
    } catch (error) {
      console.error('Error fetching financial summary:', error);
      throw error.response?.data || error;
    }
  }
};

export default orderService;
