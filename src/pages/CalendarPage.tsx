import React from 'react';
import { useJournal } from '../context/JournalContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import { Calendar as CalendarIcon, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, parseISO, isSameDay } from 'date-fns';
import { getSentimentColor } from '../utils/sentimentAnalysis';

export const CalendarPage: React.FC = () => {
  const { entries, loadingEntries } = useJournal();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            &lt;
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            &gt;
          </button>
        </div>
      </div>
    );
  };
  
  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEEEEE';
    const startDate = startOfWeek(new Date());
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-gray-600 dark:text-gray-400 text-sm font-medium">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const rows = [];
    let days = [];
    let day = startDate;
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const sameMonth = day.getMonth() === monthStart.getMonth();
        const isToday = isSameDay(day, new Date());
        
        // Check if there's an entry for this day
        const dayEntries = entries.filter(entry => 
          isSameDay(parseISO(entry.date), day)
        );
        
        // Calculate the average sentiment for the day
        let avgSentiment = 0;
        if (dayEntries.length > 0) {
          const sum = dayEntries.reduce((total, entry) => total + entry.sentiment.score, 0);
          avgSentiment = sum / dayEntries.length;
        }
        
        let bgColor = '';
        let dayContent = formattedDate;
        
        if (dayEntries.length > 0) {
          bgColor = `border-b-4 border-b-[${getSentimentColor(avgSentiment)}]`;
          dayContent = (
            <>
              {formattedDate}
              <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                <div 
                  className={`w-2 h-2 rounded-full`}
                  style={{ backgroundColor: getSentimentColor(avgSentiment) }}
                ></div>
              </div>
            </>
          );
        }
        
        days.push(
          <div
            key={day.toString()}
            className={`h-12 relative flex items-center justify-center border border-gray-200 dark:border-gray-700 ${
              !sameMonth ? 'text-gray-400 dark:text-gray-600' : ''
            } ${
              isToday ? 'bg-primary-50 dark:bg-primary-900/20 font-bold' : ''
            } ${bgColor}`}
            onClick={() => handleDayClick(day)}
          >
            {dayContent}
          </div>
        );
        day = addDays(day, 1);
      }
      
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="mb-4">{rows}</div>;
  };
  
  const nextMonth = () => {
    setCurrentMonth(prevMonth => {
      const nextMonth = new Date(prevMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    });
  };
  
  const prevMonth = () => {
    setCurrentMonth(prevMonth => {
      const prevMonthDate = new Date(prevMonth);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      return prevMonthDate;
    });
  };
  
  const handleDayClick = (day: Date) => {
    const dayEntries = entries.filter(entry => 
      isSameDay(parseISO(entry.date), day)
    );
    
    if (dayEntries.length > 0) {
      // TODO: Show entries for this day
      console.log(`Entries for ${format(day, 'PP')}:`, dayEntries);
    }
  };
  
  if (loadingEntries) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading your calendar...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Journal Calendar</h1>
        <p className="text-gray-500 dark:text-gray-400">
          View your journaling history by date
        </p>
      </div>
      
      {entries.length === 0 ? (
        <EmptyState 
          title="No entries yet"
          message="Start journaling to see your entries on the calendar. Each day you write will be highlighted with your mood color."
          actionText="Start Journaling"
          onAction={() => {}}
          icon={<CalendarIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="mb-6">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Positive</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Neutral</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Negative</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};