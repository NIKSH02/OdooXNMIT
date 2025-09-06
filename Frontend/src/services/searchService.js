import apiClient from '../api/axios';

// Search for items across products and supplier listings
export const searchItems = async (query, filters = {}) => {
  try {
    const params = new URLSearchParams({ query });
    
    // Add optional filters
    if (filters.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }
    if (filters.condition && filters.condition !== 'all') {
      params.append('condition', filters.condition);
    }
    if (filters.minPrice) {
      params.append('minPrice', filters.minPrice);
    }
    if (filters.maxPrice) {
      params.append('maxPrice', filters.maxPrice);
    }
    if (filters.location) {
      params.append('location', filters.location);
    }

    const response = await apiClient.get(`/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
};

// Get search suggestions
export const getSearchSuggestions = async (query) => {
  try {
    const response = await apiClient.get(`/search/suggestions?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Search suggestions API error:', error);
    throw error;
  }
};

// Get popular searches
export const getPopularSearches = async () => {
  try {
    const response = await apiClient.get('/search/popular');
    return response.data;
  } catch (error) {
    console.error('Popular searches API error:', error);
    throw error;
  }
};

export default {
  searchItems,
  getSearchSuggestions,
  getPopularSearches
};
