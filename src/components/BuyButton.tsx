import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface BuyButtonProps {
  symbol: string;
  price: number;
}

export default function BuyButton({ symbol, price }: BuyButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleBuy = () => {
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={handleBuy}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 
                 text-white rounded-lg text-sm font-medium transition-colors"
      >
        <ShoppingCart className="w-4 h-4" />
        Buy {symbol}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Buy {symbol}
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Current Price</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ${price.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                         rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                         dark:bg-gray-700 dark:hover:bg-gray-600
                         text-gray-900 dark:text-gray-100 rounded-lg
                         transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Purchase simulation complete!');
                    setShowModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 
                         text-white rounded-lg transition-colors"
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}