import { XProfile } from '../../types/profile';
import { generateMockTweets, generateDeletedTweets } from '../mockTweets';

export const naval: XProfile = {
  handle: 'naval',
  displayName: 'Naval',
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  bio: "I don't make predictions. I think predictions are a weird sample of human arrogance.",
  followers: 2100000,
  following: 489,
  joinDate: 'September 2007',
  location: 'San Francisco, CA',
  tweets: generateMockTweets(),
  deletedTweets: generateDeletedTweets(),
};