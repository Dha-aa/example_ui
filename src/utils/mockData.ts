import { XProfile } from '../types/profile';

// Simulated profiles for demo purposes
export const mockProfiles: Record<string, XProfile> = {
  'elonmusk': {
    handle: 'elonmusk',
    displayName: 'Elon Musk',
    profileImage: 'https://images.unsplash.com/photo-1562519990-50eb51e282b2?w=400&h=400&fit=crop',
    bio: 'Owner of X',
    followers: 170500000,
    following: 1523,
    joinDate: 'June 2009',
    location: 'Silicon Valley',
    website: 'x.com'
  },
  'naval': {
    handle: 'naval',
    displayName: 'Naval',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'I don't make predictions. I think predictions are a weird sample of human arrogance.',
    followers: 2100000,
    following: 489,
    joinDate: 'September 2007',
    location: 'San Francisco, CA'
  }
};