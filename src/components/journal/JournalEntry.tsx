import React from 'react';
import { JournalEntry as JournalEntryType } from '../../types';
import { formatEntryDate, formatEntryTime } from '../../utils/dateUtils';
import { Edit2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface JournalEntryProps {
  entry: JournalEntryType;
  onEdit?: () => void;
  onView?: () => void;
}

export const JournalEntryItem: React.FC<JournalEntryProps> = ({ 
  entry, 
  onEdit,
  onView 
}) => {
  // Get sentiment emoji and color
  const { emoji, label, score } = entry.sentiment;
  
  // Determine sentiment color class
  const getSentimentColorClass = () => {
    if (score < -0.6) return 'bg-red-500';
    if (score < -0.2) return 'bg-orange-500';
    if (score <= 0.2) return 'bg-yellow-500';
    if (score <= 0.6) return 'bg-green-500';
    return 'bg-emerald-500';
  };
  
  // Create excerpt of content
  const excerpt = entry.content.length > 150 
    ? `${entry.content.substring(0, 150)}...` 
    : entry.content;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="journal-entry group hover:border-primary-200 dark:hover:border-primary-800 border border-transparent"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{entry.title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>{formatEntryDate(entry.date)}</span>
            <span>•</span>
            <span>{formatEntryTime(entry.date)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <span className="text-lg" title={`Mood: ${label}`}>{emoji}</span>
            <div className={`w-2 h-2 rounded-full ml-1 ${getSentimentColorClass()}`}></div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
        {excerpt}
      </p>
      
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onView && (
          <button 
            onClick={onView}
            className="btn btn-outline py-1 px-2"
            aria-label="View entry"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </button>
        )}
        
        {onEdit && (
          <button 
            onClick={onEdit}
            className="btn btn-outline py-1 px-2"
            aria-label="Edit entry"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </button>
        )}
      </div>
      
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {entry.tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};