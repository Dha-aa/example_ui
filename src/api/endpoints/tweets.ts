import { apiClient } from '../client';
import { ENDPOINTS } from '../config';
import type { Tweet, DeletedTweet } from '../../types/profile';
import type { ApiResponse, TweetParams } from '../types';

/**
 * Tweet-related API endpoints
 */
export const tweetsApi = {
  /**
   * Get user's tweets
   * @param handle - User's X/Twitter handle
   * @param params - Optional parameters (pagination, time range, etc.)
   */
  getTweets: async (
    handle: string,
    params?: TweetParams
  ): Promise<ApiResponse<Tweet[]>> => {
    return apiClient.get(`${ENDPOINTS.TWEETS}/${handle}`, params);
  },

  /**
   * Get deleted tweets
   * @param handle - User's X/Twitter handle
   * @param params - Optional parameters
   */
  getDeletedTweets: async (
    handle: string,
    params?: TweetParams
  ): Promise<ApiResponse<DeletedTweet[]>> => {
    return apiClient.get(`${ENDPOINTS.TWEETS}/${handle}/deleted`, params);
  },

  /**
   * Get tweet analytics
   * @param tweetId - Tweet ID
   */
  getTweetAnalytics: async (tweetId: string): Promise<ApiResponse<any>> => {
    return apiClient.get(`${ENDPOINTS.TWEETS}/${tweetId}/analytics`);
  },
};