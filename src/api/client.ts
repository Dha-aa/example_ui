import { API_CONFIG, STATUS_CODES } from './config';
import type { ApiResponse, ApiError } from './types';

/**
 * Custom API client with built-in error handling and retries
 */
class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.token = null;
  }

  /**
   * Set authentication token
   */
  setToken(token: string) {
    this.token = token;
  }

  /**
   * Get default headers for requests
   */
  private getHeaders(): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (this.token) {
      headers.append('Authorization', `Bearer ${this.token}`);
    }

    return headers;
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): never {
    const apiError: ApiError = {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
    };

    if (error.response) {
      switch (error.response.status) {
        case STATUS_CODES.UNAUTHORIZED:
          apiError.code = 'UNAUTHORIZED';
          apiError.message = 'Authentication required';
          break;
        case STATUS_CODES.FORBIDDEN:
          apiError.code = 'FORBIDDEN';
          apiError.message = 'Access denied';
          break;
        case STATUS_CODES.NOT_FOUND:
          apiError.code = 'NOT_FOUND';
          apiError.message = 'Resource not found';
          break;
        case STATUS_CODES.RATE_LIMITED:
          apiError.code = 'RATE_LIMITED';
          apiError.message = 'Rate limit exceeded';
          break;
      }
    }

    throw apiError;
  }

  /**
   * Make API request with retries
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.getHeaders();
    
    const config: RequestInit = {
      ...options,
      headers,
      timeout: API_CONFIG.TIMEOUT,
    };

    let attempts = 0;
    
    while (attempts < API_CONFIG.RETRY_ATTEMPTS) {
      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
          throw response;
        }

        const data = await response.json();
        return data as ApiResponse<T>;
      } catch (error) {
        attempts++;
        
        if (attempts === API_CONFIG.RETRY_ATTEMPTS) {
          return this.handleError(error);
        }

        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempts) * 1000)
        );
      }
    }

    return this.handleError(new Error('Max retry attempts reached'));
  }

  /**
   * HTTP GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
  }

  /**
   * HTTP POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * HTTP PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * HTTP DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();