import React from 'react';
import { Tweet, TweetCategory } from '../types/profile';
import { formatNumber } from '../utils/formatNumber';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

interface CategoryChartProps {
  tweets: Tweet[];
}

const COLORS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#8b5cf6', // purple
  '#f59e0b', // amber
  '#06b6d4', // cyan
  '#6366f1', // indigo
  '#ec4899', // pink
];

export default function CategoryChart({ tweets }: CategoryChartProps) {
  const categoryData = tweets.reduce((acc, tweet) => {
    if (!acc[tweet.category]) {
      acc[tweet.category] = {
        count: 0,
        likes: 0,
        retweets: 0,
        replies: 0,
      };
    }
    acc[tweet.category].count += 1;
    acc[tweet.category].likes += tweet.likes;
    acc[tweet.category].retweets += tweet.retweets;
    acc[tweet.category].replies += tweet.replies;
    return acc;
  }, {} as Record<TweetCategory, { count: number; likes: number; retweets: number; replies: number }>);

  const pieData = Object.entries(categoryData).map(([category, data]) => ({
    name: category,
    value: data.count,
  }));

  const barData = Object.entries(categoryData).map(([category, data]) => ({
    name: category,
    likes: Math.round(data.likes / data.count),
    retweets: Math.round(data.retweets / data.count),
    replies: Math.round(data.replies / data.count),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const category = categoryData[data.name];
      const total = tweets.length;
      const percentage = ((category.count / total) * 100).toFixed(1);

      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-gray-100">{data.name}</p>
          <p className="text-gray-600 dark:text-gray-400">
            {category.count} tweets ({percentage}%)
          </p>
          <div className="mt-2 space-y-1 text-sm">
            <p className="text-red-500">Likes: {formatNumber(category.likes)}</p>
            <p className="text-green-500">Retweets: {formatNumber(category.retweets)}</p>
            <p className="text-blue-500">Replies: {formatNumber(category.replies)}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Tweet Analysis</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Category Distribution</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Average Engagement by Category</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="name" 
                  className="text-gray-600 dark:text-gray-400"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  className="text-gray-600 dark:text-gray-400"
                  tickFormatter={formatNumber}
                />
                <Tooltip
                  formatter={(value: number) => formatNumber(value)}
                  contentStyle={{
                    backgroundColor: 'rgb(255 255 255 / 0.9)',
                    border: '1px solid rgb(229 231 235)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Bar dataKey="likes" fill="#ef4444" name="Avg. Likes" />
                <Bar dataKey="retweets" fill="#22c55e" name="Avg. Retweets" />
                <Bar dataKey="replies" fill="#3b82f6" name="Avg. Replies" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}