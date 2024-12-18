import React from 'react';
import { Tweet } from '../types/profile';
import { Trophy, TrendingUp, MessageCircle, Repeat2, Heart } from 'lucide-react';
import { formatNumber } from '../utils/formatNumber';

interface TopTweetsProps {
  tweets: Tweet[];
}

export default function TopTweets({ tweets }: TopTweetsProps) {
  const topTweets = tweets
    .sort((a, b) => {
      const engagementA = a.likes + a.retweets + a.replies;
      const engagementB = b.likes + b.retweets + b.replies;
      return engagementB - engagementA;
    })
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Top Performing Tweets</h2>
      </div>
      <div className="space-y-4">
        {topTweets.map((tweet, index) => (
          <div key={tweet.id} className="relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="absolute -left-2 -top-2">
              {index === 0 && <span className="text-2xl">🥇</span>}
              {index === 1 && <span className="text-2xl">🥈</span>}
              {index === 2 && <span className="text-2xl">🥉</span>}
            </div>
            <p className="text-gray-900 dark:text-gray-100 mb-3 mt-2">{tweet.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                {formatNumber(tweet.likes)}
              </span>
              <span className="flex items-center gap-1">
                <Repeat2 className="w-4 h-4 text-green-500" />
                {formatNumber(tweet.retweets)}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                {formatNumber(tweet.replies)}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                {formatNumber(tweet.likes + tweet.retweets + tweet.replies)} total
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}