import apiClient from '../api/axios';

const cartService = {
  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    const response = await apiClient.post('/cart/add', {
      productId,
      quantity
    });
    return response.data;
  },

  // Get user's cart
  getCart: async () => {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  // Get cart summary
  getCartSummary: async () => {
    const response = await apiClient.get('/cart/summary');
    return response.data;
  },

  // Update item quantity in cart
  updateCartItem: async (productId, quantity) => {
    const response = await apiClient.put(`/cart/item/${productId}`, {
      quantity
    });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const response = await apiClient.delete(`/cart/item/${productId}`);
    return response.data;
  },

  // Clear entire cart
  clearCart: async () => {
    const response = await apiClient.delete('/cart/clear');
    return response.data;
  }
};

export default cartService;
