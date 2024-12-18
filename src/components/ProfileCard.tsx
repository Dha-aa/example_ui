import React from 'react';
import { XProfile } from '../types/profile';
import { MapPin, Link, Calendar, Users, Star } from 'lucide-react';
import { formatNumber } from '../utils/formatNumber';
import VerifiedBadge from './VerifiedBadge';
import { useFavorites } from '../contexts/FavoritesContext';

interface ProfileCardProps {
  profile: XProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(profile.handle);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors">
      <div className="p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <img
              src={profile.profileImage}
              alt={profile.displayName}
              className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
            />
            <div className="flex-1">
              <div className="flex items-center">
                <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100">{profile.displayName}</h2>
                {(profile.handle === 'elonmusk' || profile.handle === 'naval') && <VerifiedBadge />}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">@{profile.handle}</p>
            </div>
          </div>
          <button
            onClick={() => toggleFavorite(profile.handle)}
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-500'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-yellow-500'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{profile.bio}</p>
        
        <div className="mt-6 flex flex-wrap gap-6">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-900 dark:text-gray-100">{formatNumber(profile.followers)}</span>
            <span className="text-gray-500 dark:text-gray-400">Followers</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-900 dark:text-gray-100">{formatNumber(profile.following)}</span>
            <span className="text-gray-500 dark:text-gray-400">Following</span>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500" />
            <span>Joined {profile.joinDate}</span>
          </div>
          
          {profile.location && (
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500" />
              <span>{profile.location}</span>
            </div>
          )}
          
          {profile.website && (
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Link className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500" />
              <a
                href={`https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {profile.website}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}