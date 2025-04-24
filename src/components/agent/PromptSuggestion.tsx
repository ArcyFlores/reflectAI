import React from 'react';
import { motion } from 'framer-motion';

interface PromptSuggestionProps {
  prompt: string;
  onClick: (prompt: string) => void;
}

export const PromptSuggestion: React.FC<PromptSuggestionProps> = ({ 
  prompt, 
  onClick 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(prompt)}
      className="w-full text-left px-4 py-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 
        text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 
        transition-colors mb-2"
    >
      {prompt}
    </motion.button>
  );
};