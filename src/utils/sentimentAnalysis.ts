import { SentimentAnalysis } from "../types";

// This is a mock sentiment analysis function
// In a real application, this would call an API
export function analyzeSentiment(text: string): SentimentAnalysis {
  // Simple approach for demo purposes:
  // Count positive and negative words to determine sentiment
  const positiveWords = ['happy', 'joy', 'excited', 'good', 'great', 'excellent', 'amazing', 'love', 'wonderful', 'beautiful'];
  const negativeWords = ['sad', 'angry', 'upset', 'bad', 'terrible', 'awful', 'horrible', 'hate', 'disappointed', 'frustrating'];
  
  const words = text.toLowerCase().split(/\s+/);
  
  // Calculate positive and negative word counts
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });
  
  // Determine sentiment score from -1 to 1
  const totalWords = Math.max(words.length, 1);
  const score = ((positiveCount - negativeCount) / totalWords) * 2; // Scale appropriately
  
  // Clamp the score between -1 and 1
  const clampedScore = Math.max(-1, Math.min(1, score));
  
  // Determine sentiment label based on score
  let label: SentimentAnalysis['label'];
  let emoji: string;
  
  if (clampedScore < -0.6) {
    label = 'very negative';
    emoji = '😢';
  } else if (clampedScore < -0.2) {
    label = 'negative';
    emoji = '😕';
  } else if (clampedScore <= 0.2) {
    label = 'neutral';
    emoji = '😐';
  } else if (clampedScore <= 0.6) {
    label = 'positive';
    emoji = '😊';
  } else {
    label = 'very positive';
    emoji = '😄';
  }
  
  return {
    score: clampedScore,
    label,
    emoji
  };
}

// Function to get color based on sentiment score
export function getSentimentColor(score: number): string {
  if (score < -0.6) return 'rgb(239, 68, 68)'; // Red-500
  if (score < -0.2) return 'rgb(249, 115, 22)'; // Orange-500
  if (score <= 0.2) return 'rgb(245, 158, 11)'; // Amber-500
  if (score <= 0.6) return 'rgb(34, 197, 94)'; // Green-500
  return 'rgb(14, 159, 110)'; // Emerald-600
}