import { ChartData } from 'chart.js';

export interface CryptoPrice {
  symbol: string;
  price: number;
  timestamp: string;
  currentPrice?: number;
  priceChange?: number;
}

export interface DeletedTweet extends Tweet {
  deletedAt: string;
  reason?: string;
}

export interface Tweet {
  id: string;
  content: string;
  likes: number;
  retweets: number;
  replies: number;
  timestamp: string;
  language: string;
  category: TweetCategory;
  cryptoPrice?: CryptoPrice;
  sentiment?: 'positive' | 'negative' | 'neutral';
  isDeleted?: boolean;
}

export type TweetCategory = 
  | 'Technology'
  | 'Business'
  | 'Philosophy'
  | 'Science'
  | 'Crypto'
  | 'Space'
  | 'AI'
  | 'Personal';

export interface XProfile {
  handle: string;
  displayName: string;
  profileImage: string;
  bio: string;
  followers: number;
  following: number;
  joinDate: string;
  location?: string;
  website?: string;
  tweets: Tweet[];
  deletedTweets?: DeletedTweet[];
}

export interface SearchError {
  message: string;
  code: 'NOT_FOUND' | 'PRIVATE' | 'NETWORK_ERROR';
}

export type TweetSortOption = 'recent' | 'likes' | 'retweets' | 'replies';
export type LanguageFilter = 'all' | 'en' | 'es' | 'fr' | 'de';
export type TimeRange = '7d' | '30d' | '6m' | 'all';

export interface EngagementData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}