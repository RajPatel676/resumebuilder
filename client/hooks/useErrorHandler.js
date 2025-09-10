import { useState, useCallback } from 'react';
import { useToast } from './use-toast.js';

/**
 * Custom hook for centralized error handling
 * Provides consistent error handling patterns across the application
 */
export function useErrorHandler() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  /**
   * Handle async operations with built-in error handling
   * @param {Function} asyncFn - The async function to execute
   * @param {Object} options - Configuration options
   */
  const handleAsync = useCallback(async (asyncFn, options = {}) => {
    const {
      loadingMessage = 'Processing...',
      successMessage = 'Operation completed successfully',
      errorMessage = 'An error occurred',
      showSuccessToast = false,
      showErrorToast = true,
      retries = 0,
      retryDelay = 1000
    } = options;

    setIsLoading(true);
    setError(null);

    let lastError = null;
    let attempt = 0;

    while (attempt <= retries) {
      try {
        if (attempt > 0) {
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
        }

        const result = await asyncFn();
        
        setIsLoading(false);
        
        if (showSuccessToast) {
          toast({
            title: "Success",
            description: successMessage,
            variant: "success"
          });
        }
        
        return result;
      } catch (err) {
        lastError = err;
        attempt++;
        
        if (attempt <= retries) {
          console.warn(`Attempt ${attempt} failed, retrying...`, err);
          continue;
        }
      }
    }

    // All attempts failed
    setIsLoading(false);
    setError(lastError);

    const finalErrorMessage = getErrorMessage(lastError, errorMessage);
    
    if (showErrorToast) {
      toast({
        title: "Error",
        description: finalErrorMessage,
        variant: "destructive"
      });
    }

    throw lastError;
  }, [toast]);

  /**
   * Clear current error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Handle form validation errors
   * @param {Object} validationErrors - Object containing field validation errors
   */
  const handleValidationErrors = useCallback((validationErrors) => {
    const errorMessages = Object.values(validationErrors).filter(Boolean);
    
    if (errorMessages.length > 0) {
      toast({
        title: "Validation Error",
        description: errorMessages[0], // Show first error
        variant: "destructive"
      });
    }
  }, [toast]);

  /**
   * Handle network/API errors specifically
   * @param {Error} error - The error object
   */
  const handleApiError = useCallback((error) => {
    let message = 'An unexpected error occurred';
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      switch (status) {
        case 400:
          message = 'Invalid request. Please check your input.';
          break;
        case 401:
          message = 'Authentication required. Please log in.';
          break;
        case 403:
          message = 'Access denied. You don\'t have permission for this action.';
          break;
        case 404:
          message = 'Resource not found.';
          break;
        case 429:
          message = 'Too many requests. Please try again later.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
        default:
          message = `Request failed with status ${status}`;
      }
    } else if (error.request) {
      // Network error
      message = 'Network error. Please check your connection.';
    }

    toast({
      title: "API Error",
      description: message,
      variant: "destructive"
    });
  }, [toast]);

  return {
    isLoading,
    error,
    handleAsync,
    clearError,
    handleValidationErrors,
    handleApiError
  };
}

/**
 * Extract meaningful error message from error object
 * @param {Error} error - The error object
 * @param {string} fallback - Fallback message
 */
function getErrorMessage(error, fallback = 'An error occurred') {
  if (!error) return fallback;
  
  // Check for custom error message
  if (error.message) return error.message;
  
  // Check for API error message
  if (error.response?.data?.message) return error.response.data.message;
  
  // Check for validation errors
  if (error.response?.data?.errors) {
    const errors = error.response.data.errors;
    if (Array.isArray(errors)) return errors[0];
    if (typeof errors === 'object') return Object.values(errors)[0];
  }
  
  return fallback;
}

/**
 * Higher-order component for wrapping components with error boundaries
 */
export function withErrorHandler(Component) {
  return function WrappedComponent(props) {
    const errorHandler = useErrorHandler();
    
    return (
      <Component 
        {...props} 
        errorHandler={errorHandler}
      />
    );
  };
}

/**
 * Utility functions for common error scenarios
 */
export const ErrorUtils = {
  /**
   * Validate email format
   */
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number format
   */
  validatePhone: (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  },

  /**
   * Validate URL format
   */
  validateUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate file size and type
   */
  validateFile: (file, maxSize = 10 * 1024 * 1024, allowedTypes = []) => {
    const errors = [];
    
    if (file.size > maxSize) {
      errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
    }
    
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Sanitize user input
   */
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    
    // Remove potentially dangerous characters
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  },

  /**
   * Debounce function for preventing rapid API calls
   */
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Retry function with exponential backoff
   */
  retryWithBackoff: async (fn, maxRetries = 3, baseDelay = 1000) => {
    let lastError;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (i === maxRetries) break;
        
        const delay = baseDelay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }
};

/**
 * Custom error classes for different error types
 */
export class ValidationError extends Error {
  constructor(message, field = null) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class FileProcessingError extends Error {
  constructor(message, fileName = null) {
    super(message);
    this.name = 'FileProcessingError';
    this.fileName = fileName;
  }
}
