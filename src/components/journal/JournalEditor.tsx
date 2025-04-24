import React, { useState, useEffect } from 'react';
import { useJournal } from '../../context/JournalContext';
import { JournalEntry } from '../../types';
import { Save, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface JournalEditorProps {
  entry?: JournalEntry;
  onSave?: (entry: JournalEntry) => void;
  onCancel?: () => void;
}

export const JournalEditor: React.FC<JournalEditorProps> = ({ 
  entry, 
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState(entry?.title || 'Today\'s Reflection');
  const [content, setContent] = useState(entry?.content || '');
  const { addEntry, updateEntry, deleteEntry } = useJournal();
  
  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
    }
  }, [entry]);

  const handleSave = () => {
    if (content.trim() === '') return;
    
    let savedEntry: JournalEntry;
    
    if (entry) {
      savedEntry = updateEntry(entry.id, title, content);
    } else {
      savedEntry = addEntry(title, content);
    }
    
    if (onSave) {
      onSave(savedEntry);
    }
    
    if (!entry) {
      setTitle('Today\'s Reflection');
      setContent('');
    }
  };

  const handleDelete = () => {
    if (entry && window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(entry.id);
      if (onCancel) {
        onCancel();
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-primary-100/80 dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6"
    >
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry Title"
          className="w-full text-xl font-serif bg-transparent border-none p-0 focus:outline-none focus:ring-0"
        />
      </div>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind today? How are you feeling?"
        className="w-full min-h-[200px] bg-transparent border-none resize-none p-0 focus:outline-none focus:ring-0"
        autoFocus
      />
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-primary-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {content.length > 0 ? `${content.length} characters` : 'Start typing to see sentiment analysis'}
        </div>
        
        <div className="flex gap-2">
          {entry && (
            <button
              onClick={handleDelete}
              className="btn btn-outline text-error-600 border-error-200 hover:bg-error-50 dark:hover:bg-error-900/20"
              aria-label="Delete entry"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          )}
          
          {onCancel && (
            <button
              onClick={onCancel}
              className="btn btn-outline"
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          )}
          
          <button
            onClick={handleSave}
            disabled={content.trim() === ''}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Save entry"
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};