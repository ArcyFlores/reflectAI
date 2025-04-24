import React from 'react';
import { useJournal } from '../../context/JournalContext';
import { SmilePlus, Frown, Meh, TrendingUp, TrendingDown } from 'lucide-react';

export const MoodSummary: React.FC = () => {
  const { moodData, entries } = useJournal();
  
  // Calculate average mood for last 7 days
  const calculateAverageMood = (days: number) => {
    const now = new Date();
    const cutoffDate = new Date(now);
    cutoffDate.setDate(now.getDate() - days);
    
    const recentData = moodData.filter(item => 
      new Date(item.date) >= cutoffDate
    );
    
    if (recentData.length === 0) return 0;
    
    const sum = recentData.reduce((total, item) => total + item.score, 0);
    return sum / recentData.length;
  };
  
  // Calculate mood change (current week vs previous week)
  const calculateMoodChange = () => {
    const currentWeekAvg = calculateAverageMood(7);
    
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const previousWeekData = moodData.filter(item => {
      const date = new Date(item.date);
      return date >= twoWeeksAgo && date < oneWeekAgo;
    });
    
    if (previousWeekData.length === 0) return 0;
    
    const previousWeekAvg = previousWeekData.reduce((total, item) => 
      total + item.score, 0) / previousWeekData.length;
    
    return currentWeekAvg - previousWeekAvg;
  };
  
  const weeklyAverage = calculateAverageMood(7);
  const monthlyAverage = calculateAverageMood(30);
  const moodChange = calculateMoodChange();
  
  // Get mood label and icon
  const getMoodInfo = (score: number) => {
    if (score < -0.3) {
      return { label: 'Negative', icon: <Frown className="h-6 w-6 text-orange-500" /> };
    } else if (score > 0.3) {
      return { label: 'Positive', icon: <SmilePlus className="h-6 w-6 text-green-500" /> };
    } else {
      return { label: 'Neutral', icon: <Meh className="h-6 w-6 text-yellow-500" /> };
    }
  };
  
  const weeklyMood = getMoodInfo(weeklyAverage);
  const monthlyMood = getMoodInfo(monthlyAverage);
  
  // Get streak information
  const calculateStreak = () => {
    if (entries.length === 0) return 0;
    
    // Sort entries by date, newest first
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      
      // Check if entry is from current date
      if (entryDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (entryDate.getTime() === currentDate.getTime() - 86400000) {
        // Entry is from the previous day
        streak++;
        currentDate = entryDate;
      } else {
        // Streak broken
        break;
      }
    }
    
    return streak;
  };
  
  const streak = calculateStreak();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Weekly Mood */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Weekly Mood</p>
            <h3 className="text-2xl font-semibold mt-1 flex items-center">
              {weeklyMood.label}
            </h3>
          </div>
          {weeklyMood.icon}
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Last 7 days average
        </div>
      </div>
      
      {/* Monthly Mood */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Mood</p>
            <h3 className="text-2xl font-semibold mt-1">
              {monthlyMood.label}
            </h3>
          </div>
          {monthlyMood.icon}
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Last 30 days average
        </div>
      </div>
      
      {/* Mood Change */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Mood Change</p>
            <h3 className="text-2xl font-semibold mt-1 flex items-center">
              {moodChange > 0 ? (
                <span className="text-green-500 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-1" />
                  Improving
                </span>
              ) : moodChange < 0 ? (
                <span className="text-orange-500 flex items-center">
                  <TrendingDown className="h-5 w-5 mr-1" />
                  Declining
                </span>
              ) : (
                <span>Stable</span>
              )}
            </h3>
          </div>
          <div className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <span className="text-sm font-medium">
              {moodChange > 0 ? '+' : ''}
              {(moodChange * 100).toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Compared to previous week
        </div>
      </div>
      
      {/* Current Streak */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Journaling Streak</p>
            <h3 className="text-2xl font-semibold mt-1">{streak} day{streak !== 1 ? 's' : ''}</h3>
          </div>
          <div className="rounded-full h-10 w-10 flex items-center justify-center bg-highlight-100 text-highlight-700 dark:bg-highlight-900/30 dark:text-highlight-300">
            <span className="text-lg">🔥</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Keep it going!
        </div>
      </div>
    </div>
  );
};