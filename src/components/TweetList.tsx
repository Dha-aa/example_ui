import React from 'react';
import { Tweet, TweetSortOption, LanguageFilter, TweetCategory } from '../types/profile';
import { formatNumber } from '../utils/formatNumber';
import { MessageCircle, Repeat2, Heart } from 'lucide-react';
import CryptoPriceTag from './CryptoPriceTag';

interface TweetListProps {
  tweets: Tweet[];
  sortOption: TweetSortOption;
  languageFilter: LanguageFilter;
  onSortChange: (option: TweetSortOption) => void;
  onLanguageChange: (language: LanguageFilter) => void;
}

export default function TweetList({
  tweets,
  sortOption,
  languageFilter,
  onSortChange,
  onLanguageChange,
}: TweetListProps) {
  const [categoryFilter, setCategoryFilter] = React.useState<TweetCategory | 'all'>('all');

  const filteredAndSortedTweets = tweets
    .filter((tweet) => 
      (languageFilter === 'all' || tweet.language === languageFilter) &&
      (categoryFilter === 'all' || tweet.category === categoryFilter)
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'likes':
          return b.likes - a.likes;
        case 'retweets':
          return b.retweets - a.retweets;
        case 'replies':
          return b.replies - a.replies;
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

  const categories: (TweetCategory | 'all')[] = [
    'all',
    'Technology',
    'Business',
    'Philosophy',
    'Science',
    'Crypto',
    'Space',
    'AI',
    'Personal'
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as TweetSortOption)}
            className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                     text-gray-900 dark:text-gray-100 text-sm bg-white dark:bg-gray-700
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          >
            <option value="recent">Most Recent</option>
            <option value="likes">Most Liked</option>
            <option value="retweets">Most Retweeted</option>
            <option value="replies">Most Replies</option>
          </select>
          <select
            value={languageFilter}
            onChange={(e) => onLanguageChange(e.target.value as LanguageFilter)}
            className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                     text-gray-900 dark:text-gray-100 text-sm bg-white dark:bg-gray-700
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          >
            <option value="all">All Languages</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as TweetCategory | 'all')}
            className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                     text-gray-900 dark:text-gray-100 text-sm bg-white dark:bg-gray-700
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filteredAndSortedTweets.length} tweets
        </span>
      </div>

      <div className="space-y-4">
        {filteredAndSortedTweets.map((tweet) => (
          <div key={tweet.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded-full">
                {tweet.category}
              </span>
            </div>
            <p className="text-gray-900 dark:text-gray-100 mb-2">{tweet.content}</p>
            {tweet.cryptoPrice && (
              <div className="mb-3">
                <CryptoPriceTag cryptoPrice={tweet.cryptoPrice} />
              </div>
            )}
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {formatNumber(tweet.replies)}
              </span>
              <span className="flex items-center gap-1">
                <Repeat2 className="w-4 h-4" />
                {formatNumber(tweet.retweets)}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {formatNumber(tweet.likes)}
              </span>
              <span className="text-gray-400 dark:text-gray-500">
                {new Date(tweet.timestamp).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}