// Export all API modules
export * from './config';
export * from './types';
export * from './client';
export * from './endpoints/profile';
export * from './endpoints/tweets';
export * from './endpoints/analytics';

// Example usage:
/*
import { profileApi, tweetsApi, analyticsApi } from './api';

// Get user profile
const profile = await profileApi.getProfile('elonmusk', {
  includeMetrics: true,
  includeTweets: true,
});

// Get user's tweets
const tweets = await tweetsApi.getTweets('elonmusk', {
  page: 1,
  limit: 20,
  includeReplies: true,
});

// Get engagement metrics
const analytics = await analyticsApi.getEngagementMetrics('elonmusk', {
  startDate: '2024-01-01',
  endDate: '2024-03-14',
  metrics: ['likes', 'retweets', 'replies'],
  granularity: 'day',
});
*/