import { apiClient } from '../client';
import { ENDPOINTS } from '../config';
import type { XProfile } from '../../types/profile';
import type { ApiResponse, ProfileParams } from '../types';

/**
 * Profile-related API endpoints
 */
export const profileApi = {
  /**
   * Get user profile by handle
   * @param handle - User's X/Twitter handle
   * @param params - Optional parameters (metrics, tweets, etc.)
   */
  getProfile: async (
    handle: string,
    params?: ProfileParams
  ): Promise<ApiResponse<XProfile>> => {
    return apiClient.get(`${ENDPOINTS.PROFILE}/${handle}`, params);
  },

  /**
   * Get user's followers
   * @param handle - User's X/Twitter handle
   * @param params - Pagination parameters
   */
  getFollowers: async (
    handle: string,
    params?: ProfileParams
  ): Promise<ApiResponse<XProfile[]>> => {
    return apiClient.get(`${ENDPOINTS.PROFILE}/${handle}/followers`, params);
  },

  /**
   * Get user's following
   * @param handle - User's X/Twitter handle
   * @param params - Pagination parameters
   */
  getFollowing: async (
    handle: string,
    params?: ProfileParams
  ): Promise<ApiResponse<XProfile[]>> => {
    return apiClient.get(`${ENDPOINTS.PROFILE}/${handle}/following`, params);
  },
};