import React from 'react';
import { Star } from 'lucide-react';

interface FavoriteHandlesProps {
  favorites: string[];
  onSelect: (handle: string) => void;
}

export default function FavoriteHandles({ favorites, onSelect }: FavoriteHandlesProps) {
  if (favorites.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Star className="w-4 h-4 text-yellow-500" />
        <span className="text-sm text-gray-600 dark:text-gray-400">Quick Access</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {favorites.map((handle) => (
          <button
            key={handle}
            onClick={() => onSelect(handle)}
            className="inline-flex items-center px-3 py-1.5 rounded-full
                     bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 
                     text-blue-600 dark:text-blue-400 text-sm font-medium transition-colors"
          >
            @{handle}
          </button>
        ))}
      </div>
    </div>
  );
}