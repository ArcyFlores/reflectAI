import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { MoodData } from '../../types';
import { getSentimentColor } from '../../utils/sentimentAnalysis';
import { Calendar, TrendingUp } from 'lucide-react';
import { getPastWeekDates, getPastMonthDates } from '../../utils/dateUtils';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MoodChartProps {
  moodData: MoodData[];
}

type TimeRange = 'week' | 'month' | 'all';

export const MoodChart: React.FC<MoodChartProps> = ({ moodData }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  
  const filterDataByTimeRange = () => {
    const now = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30);
        break;
      case 'all':
      default:
        return moodData;
    }
    
    return moodData.filter(item => new Date(item.date) >= startDate);
  };
  
  const getLabels = () => {
    switch (timeRange) {
      case 'week':
        return getPastWeekDates();
      case 'month':
        return getPastMonthDates();
      case 'all':
      default:
        return moodData.map(item => item.date);
    }
  };
  
  const filteredData = filterDataByTimeRange();
  
  const chartData = {
    labels: getLabels(),
    datasets: [
      {
        label: 'Mood Score',
        data: filteredData.map(item => item.score),
        borderColor: 'rgb(20, 184, 166)', // teal-500
        backgroundColor: 'rgba(20, 184, 166, 0.5)',
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: filteredData.map(item => getSentimentColor(item.score)),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        fill: false
      }
    ]
  };
  
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: -1,
        max: 1,
        ticks: {
          callback: function(value) {
            if (value === 1) return 'Very Positive';
            if (value === 0.5) return 'Positive';
            if (value === 0) return 'Neutral';
            if (value === -0.5) return 'Negative';
            if (value === -1) return 'Very Negative';
            return '';
          },
          color: '#64748b' // slate-500
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.2)' // slate-200 with opacity
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          color: '#64748b' // slate-500
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.2)' // slate-200 with opacity
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const score = context.raw as number;
            let label = 'Mood: ';
            
            if (score < -0.6) label += 'Very Negative';
            else if (score < -0.2) label += 'Negative';
            else if (score <= 0.2) label += 'Neutral';
            else if (score <= 0.6) label += 'Positive';
            else label += 'Very Positive';
            
            return label;
          }
        }
      }
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Mood Trends</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <TrendingUp className="h-4 w-4 inline-block mr-1" />
            Track how your mood changes over time
          </p>
        </div>
        
        <div className="flex items-center mt-3 sm:mt-0 space-x-2">
          <button 
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'week' 
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Week
          </button>
          
          <button 
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'month' 
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Month
          </button>
          
          <button 
            onClick={() => setTimeRange('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'all' 
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
        </div>
      </div>
      
      <div className="h-64">
        {filteredData.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <Calendar className="h-12 w-12 mb-2 opacity-50" />
            <p>No mood data available for this time period</p>
          </div>
        )}
      </div>
    </div>
  );
};