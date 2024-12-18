// API configuration and constants
export const API_CONFIG = {
  BASE_URL: 'https://api.x.com/v2', // Base URL for X/Twitter API
  TIMEOUT: 10000, // Request timeout in milliseconds
  RETRY_ATTEMPTS: 3, // Number of retry attempts for failed requests
  RATE_LIMIT: {
    WINDOW: 15 * 60 * 1000, // 15 minutes in milliseconds
    MAX_REQUESTS: 900, // Maximum requests per window
  },
};

// API endpoints
export const ENDPOINTS = {
  PROFILE: '/users',
  TWEETS: '/tweets',
  FOLLOWERS: '/followers',
  FOLLOWING: '/following',
  LIKES: '/likes',
  MENTIONS: '/mentions',
  ANALYTICS: '/analytics',
};

// HTTP status codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  SERVER_ERROR: 500,
};