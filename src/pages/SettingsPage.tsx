import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Bell, Shield, Download, Trash2, HelpCircle } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [reminders, setReminders] = React.useState(true);
  const [privacyLock, setPrivacyLock] = React.useState(false);
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Customize your journaling experience
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-highlight-500" />
              ) : (
                <Moon className="h-5 w-5 text-accent-400" />
              )}
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {theme === 'light' ? 'Light mode' : 'Dark mode'}
                </p>
              </div>
            </div>
            
            <button 
              onClick={toggleTheme} 
              className="bg-gray-200 dark:bg-gray-700 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span 
                className={`${
                  theme === 'dark' ? 'translate-x-6 bg-primary-500' : 'translate-x-1 bg-white'
                } inline-block h-4 w-4 transform rounded-full transition-transform`}
              />
            </button>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary-500" />
              <div>
                <p className="font-medium">Daily Reminders</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive a daily reminder to journal
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setReminders(!reminders)} 
              className={`${
                reminders ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
            >
              <span 
                className={`${
                  reminders ? 'translate-x-6 bg-white' : 'translate-x-1 bg-white dark:bg-gray-400'
                } inline-block h-4 w-4 transform rounded-full transition-transform`}
              />
            </button>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Privacy & Security</h2>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-accent-500" />
              <div>
                <p className="font-medium">Privacy Lock</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Require authentication to view entries
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setPrivacyLock(!privacyLock)} 
              className={`${
                privacyLock ? 'bg-accent-600' : 'bg-gray-200 dark:bg-gray-700'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2`}
            >
              <span 
                className={`${
                  privacyLock ? 'translate-x-6 bg-white' : 'translate-x-1 bg-white dark:bg-gray-400'
                } inline-block h-4 w-4 transform rounded-full transition-transform`}
              />
            </button>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Data Management</h2>
          
          <div className="space-y-4">
            <button className="flex items-center text-left w-full">
              <Download className="h-5 w-5 text-primary-500 mr-3" />
              <div>
                <p className="font-medium">Export Journal Data</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Download all your journal entries
                </p>
              </div>
            </button>
            
            <button className="flex items-center text-left w-full">
              <Trash2 className="h-5 w-5 text-error-500 mr-3" />
              <div>
                <p className="font-medium text-error-600 dark:text-error-400">Delete All Data</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Permanently delete all your journal entries
                </p>
              </div>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Help & Support</h2>
          
          <button className="flex items-center text-left w-full">
            <HelpCircle className="h-5 w-5 text-primary-500 mr-3" />
            <div>
              <p className="font-medium">Get Help</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Contact support or view help documentation
              </p>
            </div>
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        ReflectAI v0.1.0 • Made with ❤️
      </div>
    </div>
  );
};