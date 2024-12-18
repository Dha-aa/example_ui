import React, { useState } from 'react';
import { Tweet, TimeRange } from '../types/profile';
import { MessageCircle, Repeat2, Heart, BarChart2 } from 'lucide-react';
import { formatNumber } from '../utils/formatNumber';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface EngagementStatsProps {
  tweets: Tweet[];
}

export default function EngagementStats({ tweets }: EngagementStatsProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  const filterTweetsByTimeRange = (tweets: Tweet[], range: TimeRange) => {
    const now = new Date();
    const ranges = {
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '6m': 180 * 24 * 60 * 60 * 1000,
      'all': Infinity
    };
    
    return tweets.filter(tweet => {
      const tweetDate = new Date(tweet.timestamp);
      return now.getTime() - tweetDate.getTime() <= ranges[range];
    });
  };

  const filteredTweets = filterTweetsByTimeRange(tweets, timeRange);

  const totalStats = filteredTweets.reduce(
    (acc, tweet) => ({
      tweets: acc.tweets + 1,
      likes: acc.likes + tweet.likes,
      retweets: acc.retweets + tweet.retweets,
      replies: acc.replies + tweet.replies,
    }),
    { tweets: 0, likes: 0, retweets: 0, replies: 0 }
  );

  const engagementRate = (
    ((totalStats.likes + totalStats.retweets + totalStats.replies) /
      (totalStats.tweets * 100)) *
    100
  ).toFixed(1);

  const timeSeriesData = () => {
    const data = filteredTweets
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map(tweet => ({
        date: new Date(tweet.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        likes: tweet.likes,
        retweets: tweet.retweets,
        replies: tweet.replies,
        total: tweet.likes + tweet.retweets + tweet.replies
      }));

    return data;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Engagement Overview</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                   text-gray-900 dark:text-gray-100 text-sm bg-white dark:bg-gray-700
                   focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="6m">Last 6 Months</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<MessageCircle className="w-5 h-5 text-blue-500" />}
          label="Total Replies"
          value={formatNumber(totalStats.replies)}
        />
        <StatCard
          icon={<Repeat2 className="w-5 h-5 text-green-500" />}
          label="Total Retweets"
          value={formatNumber(totalStats.retweets)}
        />
        <StatCard
          icon={<Heart className="w-5 h-5 text-red-500" />}
          label="Total Likes"
          value={formatNumber(totalStats.likes)}
        />
        <StatCard
          icon={<BarChart2 className="w-5 h-5 text-purple-500" />}
          label="Engagement Rate"
          value={`${engagementRate}%`}
        />
      </div>

      <div className="space-y-6">
        <div className="h-[300px]">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Total Engagement Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeriesData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="date" 
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis 
                className="text-gray-600 dark:text-gray-400"
                tickFormatter={formatNumber}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgb(255 255 255 / 0.9)',
                  border: '1px solid rgb(229 231 235)',
                  borderRadius: '0.5rem',
                }}
                formatter={(value: number) => [formatNumber(value), '']}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#total)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[300px]">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Detailed Engagement Metrics</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="date" 
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis 
                className="text-gray-600 dark:text-gray-400"
                tickFormatter={formatNumber}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgb(255 255 255 / 0.9)',
                  border: '1px solid rgb(229 231 235)',
                  borderRadius: '0.5rem',
                }}
                formatter={(value: number) => [formatNumber(value), '']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="retweets"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="replies"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
      <div className="flex items-center space-x-2 mb-2">
        {icon}
        <span className="text-gray-600 dark:text-gray-300 text-sm">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}