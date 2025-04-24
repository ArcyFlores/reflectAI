import React, { useState } from 'react';
import { useJournal } from '../context/JournalContext';
import { JournalEditor } from '../components/journal/JournalEditor';
import { JournalEntryItem } from '../components/journal/JournalEntry';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import { Search, Plus, BookOpen, Filter } from 'lucide-react';
import { JournalEntry } from '../types';
import { motion } from 'framer-motion';

export const JournalPage: React.FC = () => {
  const { entries, loadingEntries } = useJournal();
  const [searchQuery, setSearchQuery] = useState('');
  const [showEntryEditor, setShowEntryEditor] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | undefined>();
  
  // Filter entries based on search query
  const filteredEntries = entries.filter(entry => {
    const query = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query)
    );
  });
  
  const handleNewEntry = () => {
    setSelectedEntry(undefined);
    setShowEntryEditor(true);
  };
  
  const handleEditEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setShowEntryEditor(true);
  };
  
  const handleViewEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setShowEntryEditor(true);
  };
  
  const handleEntrySaved = () => {
    if (!selectedEntry) {
      setShowEntryEditor(false);
    }
  };
  
  const handleCancelEditing = () => {
    setSelectedEntry(undefined);
    setShowEntryEditor(false);
  };
  
  if (loadingEntries) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading your journal...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Journal</h1>
        
        <button
          onClick={handleNewEntry}
          className="btn btn-primary"
          aria-label="Create new entry"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Entry
        </button>
      </div>
      
      {showEntryEditor ? (
        <div className="mb-8">
          <JournalEditor 
            entry={selectedEntry} 
            onSave={handleEntrySaved}
            onCancel={handleCancelEditing}
          />
        </div>
      ) : entries.length > 0 ? (
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search your journal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
      ) : null}
      
      {!showEntryEditor && (
        <div className="space-y-4">
          {entries.length === 0 ? (
            <EmptyState 
              title="Your journal is empty"
              message="Start writing your first entry to begin tracking your thoughts and feelings."
              actionText="Write First Entry"
              onAction={handleNewEntry}
              icon={<BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />}
            />
          ) : filteredEntries.length === 0 ? (
            <EmptyState 
              title="No matching entries"
              message="Try adjusting your search query to find what you're looking for."
              icon={<Search className="h-8 w-8 text-primary-600 dark:text-primary-400" />}
            />
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
                </p>
                
                <button className="btn btn-outline py-1 px-2 text-sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </button>
              </div>
              
              {filteredEntries.map(entry => (
                <JournalEntryItem 
                  key={entry.id} 
                  entry={entry}
                  onEdit={() => handleEditEntry(entry)}
                  onView={() => handleViewEntry(entry)}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};