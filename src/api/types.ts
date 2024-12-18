// API response types
export interface ApiResponse<T> {
  data: T;
  meta?: {
    count: number;
    page: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Request parameters types
export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface TimeRangeParams {
  startDate?: string;
  endDate?: string;
}

export interface ProfileParams extends PaginationParams {
  includeMetrics?: boolean;
  includeTweets?: boolean;
}

export interface TweetParams extends PaginationParams, TimeRangeParams {
  includeReplies?: boolean;
  includeRetweets?: boolean;
  includeQuotes?: boolean;
}

export interface AnalyticsParams extends TimeRangeParams {
  metrics: string[];
  granularity: 'hour' | 'day' | 'week' | 'month';
}