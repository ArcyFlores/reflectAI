import React from 'react';
import { motion } from 'framer-motion';

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  timestamp?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isUser = false,
  timestamp 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-primary-600 text-white' 
            : 'bg-primary-100/80 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        }`}
      >
        <p className="text-sm sm:text-base">{message}</p>
        {timestamp && (
          <p className={`text-xs mt-1 ${
            isUser 
              ? 'text-primary-100' 
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {timestamp}
          </p>
        )}
      </div>
    </motion.div>
  );
};