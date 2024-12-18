import { XProfile } from '../../types/profile';
import { generateMockTweets, generateDeletedTweets } from '../mockTweets';

export const elonmusk: XProfile = {
  handle: 'elonmusk',
  displayName: 'Elon Musk',
  profileImage: 'https://images.unsplash.com/photo-1562519990-50eb51e282b2?w=400&h=400&fit=crop',
  bio: 'Owner of X',
  followers: 170500000,
  following: 1523,
  joinDate: 'June 2009',
  location: 'Silicon Valley',
  website: 'x.com',
  tweets: generateMockTweets(),
  deletedTweets: generateDeletedTweets(),
};