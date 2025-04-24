import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatBubble } from '../components/agent/ChatBubble';
import { PromptSuggestion } from '../components/agent/PromptSuggestion';
import { useJournal } from '../context/JournalContext';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const suggestedPrompts = [
  "What have I written most about this week?",
  "How has my mood changed over the past month?",
  "What patterns do you notice in my journal entries?",
  "What topics bring me joy in my writing?",
  "Summarize my recent entries"
];

export const AskAgentPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { entries } = useJournal();
  
  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    const userMessage: Message = {
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // TODO: Implement actual AI response
    // For now, simulate a response
    setTimeout(() => {
      const response: Message = {
        text: "I'm analyzing your journal entries to provide insights about your question. This is a placeholder response that will be replaced with actual AI-generated analysis.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reflect with AI</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Ask questions about your journal entries and get AI-powered insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="h-[60vh] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                  <Sparkles className="h-12 w-12 mb-2 opacity-50" />
                  <p className="text-center">
                    Start a conversation with your AI reflection assistant
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <ChatBubble
                    key={index}
                    message={message.text}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="flex space-x-1"
                    >
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question about your journal entries..."
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
                  px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 
                  dark:focus:ring-primary-600"
                rows={3}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 bottom-2 p-2 rounded-full text-primary-600 hover:bg-primary-50 
                  dark:text-primary-400 dark:hover:bg-primary-900/20 disabled:opacity-50 
                  disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-3">Suggested Questions</h2>
            {suggestedPrompts.map((prompt, index) => (
              <PromptSuggestion
                key={index}
                prompt={prompt}
                onClick={(text) => handleSend(text)}
              />
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>Total Entries: {entries.length}</p>
              <p>Recent Topics: mindfulness, goals, reflection</p>
              <p>Most Active Day: Wednesday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};