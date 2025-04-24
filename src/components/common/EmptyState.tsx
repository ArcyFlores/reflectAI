import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  actionText,
  onAction,
  icon
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-4 mb-4">
        {icon || <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
        {message}
      </p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4 mr-1" />
          {actionText}
        </button>
      )}
    </motion.div>
  );
};