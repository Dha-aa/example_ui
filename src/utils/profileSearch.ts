import { XProfile, SearchError } from '../types/profile';
import { mockProfiles } from '../data/mockProfiles';

export const searchProfile = async (query: string): Promise<XProfile> => {
  // Remove @ symbol if present and convert to lowercase
  const normalizedQuery = query.toLowerCase().replace('@', '');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Search by handle (exact match) or display name (case insensitive)
  const profile = Object.values(mockProfiles).find(
    p => p.handle.toLowerCase() === normalizedQuery || 
         p.displayName.toLowerCase().includes(normalizedQuery)
  );
  
  if (!profile) {
    throw {
      message: 'Profile not found. Please check the username and try again.',
      code: 'NOT_FOUND'
    } as SearchError;
  }
  
  return profile;
};