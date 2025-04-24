import React from 'react';
import { useJournal } from '../context/JournalContext';
import { MoodChart } from '../components/insights/MoodChart';
import { MoodSummary } from '../components/insights/MoodSummary';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import { BarChart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InsightsPage: React.FC = () => {
  const { moodData, loadingEntries } = useJournal();
  
  if (loadingEntries) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading your insights...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mood Insights</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Track your emotional patterns over time
        </p>
      </div>
      
      {moodData.length === 0 ? (
        <EmptyState 
          title="No mood data yet"
          message="Start journaling to track your mood patterns over time. Each entry you write will be analyzed for sentiment and added to your mood chart."
          actionText="Start Journaling"
          onAction={() => {}}
          icon={<BarChart className="h-8 w-8 text-primary-600 dark:text-primary-400" />}
        />
      ) : (
        <>
          <div className="mb-6">
            <MoodSummary />
          </div>
          
          <div className="mb-6">
            <MoodChart moodData={moodData} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Journaling Trends</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You've written {moodData.length} journal entries so far. Keep it up!
              </p>
              <Link to="/" className="btn btn-primary">
                <BookOpen className="h-4 w-4 mr-1" />
                Write New Entry
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Mood Patterns</h2>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Positive entries
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {moodData.filter(d => d.score > 0.2).length} entries
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Neutral entries
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {moodData.filter(d => d.score >= -0.2 && d.score <= 0.2).length} entries
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Negative entries
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {moodData.filter(d => d.score < -0.2).length} entries
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};