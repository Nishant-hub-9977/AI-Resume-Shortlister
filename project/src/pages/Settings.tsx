import React, { useState } from 'react';
import { Save, Key, FileText, Globe, Lock, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [openAIKey, setOpenAIKey] = useState<string>('');
  const [googleAPIKey, setGoogleAPIKey] = useState<string>('');
  const [saving, setSaving] = useState(false);
  
  const handleSaveKeys = async () => {
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would securely store these keys on the backend
      localStorage.setItem('openai_key', openAIKey);
      localStorage.setItem('google_key', googleAPIKey);
      
      setSaving(false);
      toast.success('API keys saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('An error occurred while saving API keys');
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} p-6`}>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Key className="w-5 h-5 mr-2 text-blue-500" />
          API Keys
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="openai_key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type="password"
                id="openai_key"
                value={openAIKey}
                onChange={(e) => setOpenAIKey(e.target.value)}
                placeholder="sk-..."
                className={`w-full px-3 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Required for AI-powered resume analysis
            </p>
          </div>

          <div>
            <label htmlFor="google_api_key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Google API Key (Optional)
            </label>
            <input
              type="password"
              id="google_api_key"
              value={googleAPIKey}
              onChange={(e) => setGoogleAPIKey(e.target.value)}
              placeholder="AIza..."
              className={`w-full px-3 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <p className="mt-1 text-xs text-gray-500">
              Used for additional document processing features
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSaveKeys}
              disabled={saving || !openAIKey}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save API Keys</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} p-6`}>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-blue-500" />
          Appearance
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-500">Toggle between light and dark theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} p-6`}>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-blue-500" />
          Data Privacy
        </h2>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium">Resume Data Privacy</h3>
              <p className="text-sm text-gray-500 mt-1">
                All resume data is processed securely in your browser and on your server. 
                We do not store candidate information on our servers unless you explicitly choose to save it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;