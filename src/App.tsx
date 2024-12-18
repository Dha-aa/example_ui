import React, { useState } from 'react';
import { SearchError, XProfile, TweetSortOption, LanguageFilter } from './types/profile';
import { searchProfile } from './utils/profileSearch';
import SearchBar from './components/SearchBar';
import FavoriteHandles from './components/FavoriteHandles';
import ProfileCard from './components/ProfileCard';
import TweetList from './components/TweetList';
import DeletedTweets from './components/DeletedTweets';
import CategoryChart from './components/CategoryChart';
import EngagementStats from './components/EngagementStats';
import TopTweets from './components/TopTweets';
import CryptoTrades from './components/CryptoTrades';
import ThemeToggle from './components/ThemeToggle';
import AudienceInsights from './components/AudienceInsights';
import SentimentAnalysis from './components/SentimentAnalysis';
import { AlertCircle } from 'lucide-react';
import { useFavorites } from './contexts/FavoritesContext';

function App() {
  const [profile, setProfile] = useState<XProfile | null>(null);
  const [error, setError] = useState<SearchError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState<TweetSortOption>('recent');
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>('all');
  const { favorites } = useFavorites();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setProfile(null);

    try {
      const result = await searchProfile(query);
      setProfile(result);
    } catch (err) {
      setError(err as SearchError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Search Section with Theme Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="flex-1 w-full">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <FavoriteHandles favorites={favorites} onSelect={handleSearch} />
          </div>
          <ThemeToggle />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-pulse text-gray-600 dark:text-gray-400">
              Searching...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p>{error.message}</p>
          </div>
        )}

        {/* Profile Content */}
        {profile && (
          <div className="space-y-6">
            {/* Profile Card */}
            <ProfileCard profile={profile} />

            {/* Audience and Sentiment Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AudienceInsights profile={profile} />
              <SentimentAnalysis tweets={profile.tweets} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopTweets tweets={profile.tweets} />
              <CryptoTrades tweets={profile.tweets} />
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <EngagementStats tweets={profile.tweets} />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <CategoryChart tweets={profile.tweets} />
              </div>
            </div>

            {/* Tweet Lists */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Recent Tweets
                </h2>
                <TweetList
                  tweets={profile.tweets}
                  sortOption={sortOption}
                  languageFilter={languageFilter}
                  onSortChange={setSortOption}
                  onLanguageChange={setLanguageFilter}
                />
              </div>

              {profile.deletedTweets && profile.deletedTweets.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <DeletedTweets tweets={profile.deletedTweets} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;