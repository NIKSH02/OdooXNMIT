import apiClient from '../api/axios';

const productService = {
  // Get all products with filters
  getAllProducts: async (params = {}) => {
    const response = await apiClient.get('/items', { params });
    return response.data;
  },

  // Get product by ID
  getProductById: async (id) => {
    const response = await apiClient.get(`/items/${id}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category, params = {}) => {
    const response = await apiClient.get(`/items/category/${category}`, { params });
    return response.data;
  },

  // Get user's own products
  getMyProducts: async (params = {}) => {
    const response = await apiClient.get('/items/user/my-products', { params });
    return response.data;
  },

  // Create new product
  createProduct: async (productData) => {
    const formData = new FormData();
    
    // Append basic fields
    Object.keys(productData).forEach(key => {
      if (key === 'images') {
        // Handle image files
        if (productData.images && productData.images.length > 0) {
          productData.images.forEach((image) => {
            formData.append('images', image);
          });
        }
      } else if (key === 'location' || key === 'dimensions' || key === 'contactPreferences') {
        // Stringify objects
        formData.append(key, JSON.stringify(productData[key]));
      } else if (key === 'tags' && Array.isArray(productData[key])) {
        // Handle tags array
        formData.append(key, JSON.stringify(productData[key]));
      } else if (productData[key] !== undefined && productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    });

    const response = await apiClient.post('/items', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update product
  updateProduct: async (id, productData) => {
    const response = await apiClient.put(`/items/${id}`, productData);
    return response.data;
  },

  // Toggle product status
  toggleProductStatus: async (id) => {
    const response = await apiClient.patch(`/items/${id}/toggle-status`);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/items/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (searchQuery, filters = {}) => {
    const params = {
      search: searchQuery,
      ...filters
    };
    const response = await apiClient.get('/items', { params });
    return response.data;
  }
};

export default productService;
