import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, FileText, Edit3, CheckCircle, Copy } from 'lucide-react';
import { useJob } from '../context/JobContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const JobDescription: React.FC = () => {
  const { jobDescription, setJobDescription } = useJob();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [title, setTitle] = useState(jobDescription?.title || '');
  const [description, setDescription] = useState(jobDescription?.description || '');
  const [skills, setSkills] = useState<string[]>(jobDescription?.requiredSkills || []);
  const [newSkill, setNewSkill] = useState('');
  const [isEditing, setIsEditing] = useState(!jobDescription);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title || !description || skills.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setJobDescription({
        title,
        description,
        requiredSkills: skills,
        created: new Date().toISOString()
      });
      
      setSaving(false);
      setIsEditing(false);
      toast.success('Job description saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('An error occurred while saving');
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    } else if (skills.includes(newSkill)) {
      toast.error('This skill is already added');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill) {
      e.preventDefault();
      addSkill();
    }
  };

  const copyToClipboard = () => {
    const text = `${title}\n\n${description}\n\nRequired Skills:\n${skills.join(', ')}`;
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Description</h1>
        
        <div className="flex space-x-4">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg flex items-center space-x-2 transition-colors duration-200`}
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg flex items-center space-x-2 transition-colors duration-200`}
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
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
                  <span>Save</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} p-6`}>
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Title*
            </label>
            {isEditing ? (
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g. Senior Frontend Developer"
              />
            ) : (
              <h2 className="text-xl font-semibold">{title}</h2>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Description*
            </label>
            {isEditing ? (
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                className={`w-full px-3 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter detailed job description, responsibilities, and requirements..."
              />
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-line">{description}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Required Skills*
            </label>
            
            {isEditing && (
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 px-3 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'} rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Add a required skill"
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors duration-200"
                >
                  Add
                </button>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'} ${isEditing ? 'pr-1' : ''}`}
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              
              {skills.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No skills added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;