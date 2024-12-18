import { apiClient } from '../client';
import { ENDPOINTS } from '../config';
import type { ApiResponse, AnalyticsParams } from '../types';

/**
 * Analytics-related API endpoints
 */
export const analyticsApi = {
  /**
   * Get engagement metrics
   * @param handle - User's X/Twitter handle
   * @param params - Analytics parameters
   */
  getEngagementMetrics: async (
    handle: string,
    params: AnalyticsParams
  ): Promise<ApiResponse<any>> => {
    return apiClient.get(`${ENDPOINTS.ANALYTICS}/${handle}/engagement`, params);
  },

  /**
   * Get audience insights
   * @param handle - User's X/Twitter handle
   * @param params - Analytics parameters
   */
  getAudienceInsights: async (
    handle: string,
    params: AnalyticsParams
  ): Promise<ApiResponse<any>> => {
    return apiClient.get(`${ENDPOINTS.ANALYTICS}/${handle}/audience`, params);
  },

  /**
   * Get sentiment analysis
   * @param handle - User's X/Twitter handle
   * @param params - Analytics parameters
   */
  getSentimentAnalysis: async (
    handle: string,
    params: AnalyticsParams
  ): Promise<ApiResponse<any>> => {
    return apiClient.get(`${ENDPOINTS.ANALYTICS}/${handle}/sentiment`, params);
  },
};