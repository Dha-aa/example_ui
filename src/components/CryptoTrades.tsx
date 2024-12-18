import React from 'react';
import { Tweet } from '../types/profile';
import { DollarSign, ArrowUpRight, ArrowDownRight, ShoppingCart } from 'lucide-react';
import BuyButton from './BuyButton';

interface CryptoTradesProps {
  tweets: Tweet[];
}

export default function CryptoTrades({ tweets }: CryptoTradesProps) {
  const cryptoTweets = tweets
    .filter(tweet => tweet.cryptoPrice && tweet.category === 'Crypto')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  if (cryptoTweets.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Latest Crypto Mentions</h2>
      </div>
      <div className="space-y-4">
        {cryptoTweets.map(tweet => (
          <div key={tweet.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {tweet.cryptoPrice?.symbol}
              </span>
              <div className="flex items-center gap-1">
                {tweet.cryptoPrice?.priceChange && tweet.cryptoPrice.priceChange > 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  tweet.cryptoPrice?.priceChange && tweet.cryptoPrice.priceChange > 0 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {tweet.cryptoPrice?.priceChange}%
                </span>
              </div>
            </div>
            <p className="text-gray-900 dark:text-gray-100 mb-2">{tweet.content}</p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(tweet.timestamp).toLocaleDateString()}
              </div>
              <BuyButton 
                symbol={tweet.cryptoPrice?.symbol || ''} 
                price={tweet.cryptoPrice?.price || 0} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}