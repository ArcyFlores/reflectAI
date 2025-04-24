export interface JournalEntry {
  id: string;
  content: string;
  title: string;
  date: string;
  createdAt: string;
  sentiment: SentimentAnalysis;
  tags?: string[];
}

export interface SentimentAnalysis {
  score: number; // Range from -1 (very negative) to 1 (very positive)
  label: 'very negative' | 'negative' | 'neutral' | 'positive' | 'very positive';
  emoji: string;
}

export interface MoodData {
  date: string;
  score: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  streak: number;
  lastEntryDate: string | null;
}