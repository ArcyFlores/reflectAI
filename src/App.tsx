import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { JournalProvider } from './context/JournalContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/ui/Header';
import { JournalPage } from './pages/JournalPage';
import { InsightsPage } from './pages/InsightsPage';
import { CalendarPage } from './pages/CalendarPage';
import { SettingsPage } from './pages/SettingsPage';
import { AskAgentPage } from './pages/AskAgentPage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <JournalProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<JournalPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/reflect" element={<AskAgentPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </JournalProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;