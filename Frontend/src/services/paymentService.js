// Payment Service API
import apiClient from '../api/axios';

export const paymentService = {
  // Create Razorpay order
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/payments/create-order', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error.response?.data || error;
    }
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    try {
      const response = await apiClient.post('/payments/verify', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error.response?.data || error;
    }
  },

  // Process cart checkout
  processCartCheckout: async (cartData) => {
    try {
      const response = await apiClient.post('/payments/cart-checkout', cartData);
      return response.data;
    } catch (error) {
      console.error('Error processing cart checkout:', error);
      throw error.response?.data || error;
    }
  },

  // Get payment history
  getPaymentHistory: async (page = 1, limit = 10) => {
    try {
      const params = { page, limit };
      const response = await apiClient.get('/payments/history', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error.response?.data || error;
    }
  },

  // Initialize Razorpay payment
  initializeRazorpayPayment: (options) => {
    return new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error('Razorpay SDK not loaded'));
        return;
      }

      const rzp = new window.Razorpay({
        ...options,
        handler: function (response) {
          resolve(response);
        },
        modal: {
          ondismiss: function () {
            reject(new Error('Payment cancelled by user'));
          }
        }
      });

      rzp.open();
    });
  },

  // Create order from cart
  createOrderFromCart: async (paymentMethod = 'razorpay') => {
    try {
      const response = await apiClient.post('/orders/create-from-cart', {
        paymentMethod
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order from cart:', error);
      throw error.response?.data || error;
    }
  }
};

// Razorpay integration helper
export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const openRazorpayCheckout = async (options) => {
  const isLoaded = await initializeRazorpay();
  
  if (!isLoaded) {
    throw new Error('Failed to load Razorpay SDK');
  }

  const rzp = new window.Razorpay(options);
  rzp.open();
};

export default paymentService;
