import { Tweet, TweetCategory, CryptoPrice, DeletedTweet } from '../types/profile';

const categories: TweetCategory[] = [
  'Technology',
  'Business',
  'Philosophy',
  'Science',
  'Crypto',
  'Space',
  'AI',
  'Personal'
];

const languages = ['en', 'es', 'fr', 'de'];

const cryptoPrices: Record<string, { price: number; currentPrice: number }> = {
  'BTC': { price: 65000, currentPrice: 67500 },
  'ETH': { price: 3500, currentPrice: 3300 },
  'DOGE': { price: 0.15, currentPrice: 0.16 },
  'ADA': { price: 1.20, currentPrice: 1.15 },
  'SOL': { price: 110, currentPrice: 118 },
};

function generateUniqueId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateCryptoPrice(timestamp: string): CryptoPrice | undefined {
  if (Math.random() > 0.7) {
    const symbol = Object.keys(cryptoPrices)[Math.floor(Math.random() * Object.keys(cryptoPrices).length)];
    const basePrice = cryptoPrices[symbol].price;
    const currentPrice = cryptoPrices[symbol].currentPrice;
    const variance = basePrice * 0.1;
    const price = basePrice + (Math.random() * variance * 2 - variance);
    const priceChange = ((currentPrice - price) / price) * 100;
    
    return {
      symbol,
      price: Number(price.toFixed(2)),
      currentPrice: Number(currentPrice.toFixed(2)),
      priceChange: Number(priceChange.toFixed(2)),
      timestamp,
    };
  }
  return undefined;
}

export function generateMockTweets(count: number = 30): Tweet[] {
  const now = new Date();
  const tweets: Tweet[] = [];

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(
      now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    const tweet: Tweet = {
      id: generateUniqueId('tweet'),
      content: `Sample tweet #${i + 1} about ${categories[Math.floor(Math.random() * categories.length)]}`,
      likes: Math.floor(Math.random() * 10000),
      retweets: Math.floor(Math.random() * 5000),
      replies: Math.floor(Math.random() * 2000),
      timestamp,
      language: languages[Math.floor(Math.random() * languages.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      cryptoPrice: generateCryptoPrice(timestamp),
      sentiment: Math.random() > 0.6 ? 'positive' : Math.random() > 0.5 ? 'negative' : 'neutral',
    };

    tweets.push(tweet);
  }

  return tweets.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function generateDeletedTweets(count: number = 5): DeletedTweet[] {
  const now = new Date();
  const reasons = [
    'Violated community guidelines',
    'Posted sensitive information',
    'Contained misleading content',
    'Author requested removal',
  ];

  return Array.from({ length: count }, (_, i) => {
    const timestamp = new Date(
      now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString();
    
    const deletedAt = new Date(
      new Date(timestamp).getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    return {
      id: generateUniqueId('deleted'),
      content: `Deleted tweet #${i + 1} about ${categories[Math.floor(Math.random() * categories.length)]}`,
      likes: Math.floor(Math.random() * 10000),
      retweets: Math.floor(Math.random() * 5000),
      replies: Math.floor(Math.random() * 2000),
      timestamp,
      language: languages[Math.floor(Math.random() * languages.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      cryptoPrice: generateCryptoPrice(timestamp),
      sentiment: Math.random() > 0.6 ? 'positive' : Math.random() > 0.5 ? 'negative' : 'neutral',
      deletedAt,
      reason: Math.random() > 0.3 ? reasons[Math.floor(Math.random() * reasons.length)] : undefined,
    };
  });
}