import { useState, useEffect, useRef, useCallback } from 'react';

// Custom hook for debouncing values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for preventing multiple API calls
export const useApiCall = () => {
  const cancelRef = useRef();

  const callApi = async (apiFunction) => {
    // Cancel previous call if it exists
    if (cancelRef.current) {
      cancelRef.current.abort();
    }

    // Create new AbortController
    const controller = new AbortController();
    cancelRef.current = controller;

    try {
      const result = await apiFunction(controller.signal);
      return result;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('API call was cancelled');
        return null;
      }
      throw error;
    }
  };

  useEffect(() => {
    return () => {
      if (cancelRef.current) {
        cancelRef.current.abort();
      }
    };
  }, []);

  return callApi;
};

// Custom hook for local storage with React state sync
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Custom hook for retry logic
export const useRetry = (maxRetries = 3) => {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const retry = useCallback(() => {
    if (retryCount < maxRetries) {
      setIsRetrying(true);
      setRetryCount(prev => prev + 1);
      setTimeout(() => setIsRetrying(false), 100);
    }
  }, [retryCount, maxRetries]);

  const reset = useCallback(() => {
    setRetryCount(0);
    setIsRetrying(false);
  }, []);

  return {
    retryCount,
    isRetrying,
    canRetry: retryCount < maxRetries,
    retry,
    reset
  };
};
