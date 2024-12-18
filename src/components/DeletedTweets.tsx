import React from 'react';
import { DeletedTweet } from '../types/profile';
import { Trash2, AlertCircle } from 'lucide-react';
import { formatNumber } from '../utils/formatNumber';

interface DeletedTweetsProps {
  tweets: DeletedTweet[];
}

export default function DeletedTweets({ tweets }: DeletedTweetsProps) {
  if (tweets.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <Trash2 className="w-5 h-5 text-red-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Deleted Tweets</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">({tweets.length})</span>
      </div>
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-1" />
              <div className="flex-1">
                <p className="text-gray-900 dark:text-gray-100 mb-2">{tweet.content}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Deleted: {new Date(tweet.deletedAt).toLocaleDateString()}</span>
                  <span>Likes: {formatNumber(tweet.likes)}</span>
                  <span>Retweets: {formatNumber(tweet.retweets)}</span>
                  {tweet.reason && (
                    <span className="text-red-600 dark:text-red-400">Reason: {tweet.reason}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}