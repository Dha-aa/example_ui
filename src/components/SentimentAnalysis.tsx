import React from 'react';
import { Tweet } from '../types/profile';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SmilePlus, Frown, Minus } from 'lucide-react';

interface SentimentAnalysisProps {
  tweets: Tweet[];
}

export default function SentimentAnalysis({ tweets }: SentimentAnalysisProps) {
  const sentimentCounts = tweets.reduce(
    (acc, tweet) => {
      if (tweet.sentiment) {
        acc[tweet.sentiment]++;
      }
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0 }
  );

  const data = [
    { name: 'Positive', value: sentimentCounts.positive, color: '#22c55e' },
    { name: 'Negative', value: sentimentCounts.negative, color: '#ef4444' },
    { name: 'Neutral', value: sentimentCounts.neutral, color: '#6b7280' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Sentiment Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <SmilePlus className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-green-600 dark:text-green-400">Positive</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {((sentimentCounts.positive / tweets.length) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <Frown className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-red-600 dark:text-red-400">Negative</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {((sentimentCounts.negative / tweets.length) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <Minus className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Neutral</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {((sentimentCounts.neutral / tweets.length) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(255 255 255 / 0.9)',
                border: '1px solid rgb(229 231 235)',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}