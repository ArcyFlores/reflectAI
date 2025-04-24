import { faker } from '@faker-js/faker';
import { JournalEntry, User } from '../types';
import { analyzeSentiment } from './sentimentAnalysis';
import { getCurrentDate } from './dateUtils';

// Generate a mock user
export function generateUser(): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    streak: faker.number.int({ min: 1, max: 30 }),
    lastEntryDate: faker.date.recent().toISOString(),
  };
}

// Generate mock journal entries
export function generateEntries(count: number = 30): JournalEntry[] {
  const entries: JournalEntry[] = [];
  
  for (let i = 0; i < count; i++) {
    const content = faker.lorem.paragraphs({ min: 1, max: 3 });
    const date = faker.date.recent({ days: 60 - i }).toISOString();
    const title = faker.lorem.sentence({ min: 3, max: 8 }).replace('.', '');
    
    entries.push({
      id: faker.string.uuid(),
      content,
      title,
      date,
      createdAt: date,
      sentiment: analyzeSentiment(content),
      tags: i % 3 === 0 ? [faker.word.sample(), faker.word.sample()] : undefined,
    });
  }
  
  // Sort entries by date (newest first)
  return entries.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Generate entries for today if none exist
export function generateTodayEntryIfNeeded(entries: JournalEntry[]): JournalEntry[] {
  const today = new Date().toDateString();
  const hasTodayEntry = entries.some(entry => 
    new Date(entry.date).toDateString() === today
  );
  
  if (!hasTodayEntry) {
    const newEntry: JournalEntry = {
      id: faker.string.uuid(),
      content: "",
      title: "Today's Reflection",
      date: getCurrentDate(),
      createdAt: getCurrentDate(),
      sentiment: {
        score: 0,
        label: 'neutral',
        emoji: '😐'
      }
    };
    
    return [newEntry, ...entries];
  }
  
  return entries;
}