import React, { createContext, useState, useContext, useEffect } from 'react';
import { JournalEntry, MoodData } from '../types';
import { generateEntries, generateTodayEntryIfNeeded } from '../utils/mockData';
import { analyzeSentiment } from '../utils/sentimentAnalysis';
import { getCurrentDate } from '../utils/dateUtils';

interface JournalContextType {
  entries: JournalEntry[];
  loadingEntries: boolean;
  moodData: MoodData[];
  getEntryById: (id: string) => JournalEntry | undefined;
  addEntry: (title: string, content: string) => JournalEntry;
  updateEntry: (id: string, title: string, content: string) => JournalEntry;
  deleteEntry: (id: string) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const useJournal = (): JournalContextType => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [moodData, setMoodData] = useState<MoodData[]>([]);

  // Load entries on mount
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const mockEntries = generateEntries(30);
      const entriesWithToday = generateTodayEntryIfNeeded(mockEntries);
      setEntries(entriesWithToday);
      
      // Generate mood data from entries
      const moodDataFromEntries = entriesWithToday.map(entry => ({
        date: entry.date.split('T')[0],
        score: entry.sentiment.score
      }));
      
      setMoodData(moodDataFromEntries);
      setLoadingEntries(false);
    }, 1000);
  }, []);

  const getEntryById = (id: string): JournalEntry | undefined => {
    return entries.find(entry => entry.id === id);
  };

  const addEntry = (title: string, content: string): JournalEntry => {
    const sentiment = analyzeSentiment(content);
    const now = getCurrentDate();
    
    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      title,
      content,
      date: now,
      createdAt: now,
      sentiment
    };
    
    setEntries(prevEntries => [newEntry, ...prevEntries]);
    
    // Update mood data
    setMoodData(prevData => [
      { date: now.split('T')[0], score: sentiment.score },
      ...prevData
    ]);
    
    return newEntry;
  };

  const updateEntry = (id: string, title: string, content: string): JournalEntry => {
    const sentiment = analyzeSentiment(content);
    
    const updatedEntries = entries.map(entry => {
      if (entry.id === id) {
        return {
          ...entry,
          title,
          content,
          sentiment
        };
      }
      return entry;
    });
    
    setEntries(updatedEntries);
    
    // Update mood data
    const updatedEntry = updatedEntries.find(entry => entry.id === id)!;
    setMoodData(prevData => 
      prevData.map(data => 
        data.date === updatedEntry.date.split('T')[0]
          ? { ...data, score: sentiment.score }
          : data
      )
    );
    
    return updatedEntry;
  };

  const deleteEntry = (id: string): void => {
    const entryToDelete = entries.find(entry => entry.id === id);
    
    if (entryToDelete) {
      setEntries(prevEntries => 
        prevEntries.filter(entry => entry.id !== id)
      );
      
      // Remove from mood data
      setMoodData(prevData => 
        prevData.filter(data => 
          data.date !== entryToDelete.date.split('T')[0]
        )
      );
    }
  };

  return (
    <JournalContext.Provider
      value={{
        entries,
        loadingEntries,
        moodData,
        getEntryById,
        addEntry,
        updateEntry,
        deleteEntry
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};