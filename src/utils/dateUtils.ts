import { format, parseISO, isToday, isYesterday, isThisWeek, isThisMonth } from 'date-fns';

// Format the date in a human-readable way
export function formatDate(dateStr: string): string {
  const date = parseISO(dateStr);
  
  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else if (isThisWeek(date)) {
    return format(date, 'EEEE'); // Day of week
  } else if (isThisMonth(date)) {
    return format(date, 'MMMM d'); // Month and day
  } else {
    return format(date, 'MMMM d, yyyy');
  }
}

// Get current date in ISO format
export function getCurrentDate(): string {
  return new Date().toISOString();
}

// Format date for display in the journal entry
export function formatEntryDate(dateStr: string): string {
  const date = parseISO(dateStr);
  return format(date, 'MMMM d, yyyy');
}

// Format time for display in the journal entry
export function formatEntryTime(dateStr: string): string {
  const date = parseISO(dateStr);
  return format(date, 'h:mm a');
}

// Get dates for past week (for chart display)
export function getPastWeekDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(format(date, 'MMM d'));
  }
  
  return dates;
}

// Get dates for past month (for chart display)
export function getPastMonthDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    if (i % 3 === 0) { // Show every third date to avoid crowding
      dates.push(format(date, 'MMM d'));
    } else {
      dates.push('');
    }
  }
  
  return dates;
}