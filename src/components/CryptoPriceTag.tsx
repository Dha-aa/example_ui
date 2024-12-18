import React from 'react';
import { CryptoPrice } from '../types/profile';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoPriceTagProps {
  cryptoPrice: CryptoPrice;
}

export default function CryptoPriceTag({ cryptoPrice }: CryptoPriceTagProps) {
  const priceChange = cryptoPrice.priceChange || 0;
  const isBullish = priceChange >= 0;
  
  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 
                    text-blue-700 dark:text-blue-400 px-2 py-1 rounded-md text-sm
                    border border-blue-100 dark:border-blue-800 transition-colors">
        <TrendingUp className="w-4 h-4" />
        <span>{cryptoPrice.symbol}:</span>
        <span className="font-medium">${cryptoPrice.price.toLocaleString()}</span>
      </div>
      {cryptoPrice.currentPrice && (
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm
          ${isBullish 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800'
          } border transition-colors`}>
          {isBullish ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-medium">
            ${cryptoPrice.currentPrice.toLocaleString()}
          </span>
          <span>
            ({priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%)
          </span>
        </div>
      )}
    </div>
  );
}