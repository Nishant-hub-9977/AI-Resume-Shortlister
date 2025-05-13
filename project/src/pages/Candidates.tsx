import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download, Filter, Search, X, ExternalLink, ArrowUpDown } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { useJob } from '../context/JobContext';
import { useTheme } from '../context/ThemeContext';
import CandidateCard from '../components/CandidateCard';
import toast from 'react-hot-toast';

const Candidates: React.FC = () => {
  const { resumes } = useResume();
  const { jobDescription } = useJob();
  const { theme } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterScore, setFilterScore] = useState(0);
  const [filterSkills, setFilterSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'date'>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const toggleSort = (field: 'score' | 'name' | 'date') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const handleExport = () => {
    // In a real app, this would generate a CSV or PDF
    toast.success('Export started. File will download shortly.');
  };

  const filteredCandidates = resumes
    .filter(resume => 
      (resume.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       resume.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      resume.score >= filterScore &&
      (filterSkills.length === 0 || 
        filterSkills.every(skill => 
          resume.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        ))
    )
    .sort((a, b) => {
      if (sortBy === 'score') {
        return sortDirection === 'asc' ? a.score - b.score : b.score - a.score;
      } else if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const handleFilterSkill = (skill: string) => {
    if (filterSkills.includes(skill)) {
      setFilterSkills(filterSkills.filter(s => s !== skill));
    } else {
      setFilterSkills([...filterSkills, skill]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-2xl font-bold">Candidates</h1>
        
        <div className="flex flex-wrap gap-3">
          <div className={`relative rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} rounded-lg border flex items-center space-x-2`}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          <button
            onClick={handleExport}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">Filter by Score</h3>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={filterScore}
                  onChange={(e) => setFilterScore(Number(e.target.value))}
                  className="w-full"
                />
                <span className="ml-3 min-w-[50px] text-right">
                  {filterScore}%+
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-2">Filter by Skills</h3>
              <div className="flex flex-wrap gap-2">
                {jobDescription?.requiredSkills?.map((skill, index) => (
                  <button
                    key={index}
                    onClick={() => handleFilterSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      filterSkills.includes(skill)
                        ? 'bg-blue-600 text-white'
                        : `${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`
                    }`}
                  >
                    {skill}
                  </button>
                ))}
                
                {!jobDescription?.requiredSkills?.length && (
                  <p className="text-gray-500 text-sm">
                    Define skills in the Job Description first
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} found
        </p>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
            <button
              onClick={() => toggleSort('score')}
              className={`flex items-center text-sm ${sortBy === 'score' ? 'font-semibold text-blue-600' : ''}`}
            >
              <span>Score</span>
              {sortBy === 'score' && (
                <ArrowUpDown className="ml-1 h-3 w-3" />
              )}
            </button>
            <button
              onClick={() => toggleSort('name')}
              className={`flex items-center text-sm ${sortBy === 'name' ? 'font-semibold text-blue-600' : ''}`}
            >
              <span>Name</span>
              {sortBy === 'name' && (
                <ArrowUpDown className="ml-1 h-3 w-3" />
              )}
            </button>
            <button
              onClick={() => toggleSort('date')}
              className={`flex items-center text-sm ${sortBy === 'date' ? 'font-semibold text-blue-600' : ''}`}
            >
              <span>Date</span>
              {sortBy === 'date' && (
                <ArrowUpDown className="ml-1 h-3 w-3" />
              )}
            </button>
          </div>
        </div>
      </div>

      {resumes.length === 0 && (
        <div className={`text-center py-12 rounded-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-lg font-semibold mb-2">No resumes have been uploaded yet</h3>
          <p className="text-gray-500 mb-4">Upload resumes to start the analysis process</p>
          <a 
            href="/upload"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Upload className="w-4 h-4 mr-2" />
            <span>Upload Resumes</span>
          </a>
        </div>
      )}

      {resumes.length > 0 && filteredCandidates.length === 0 && (
        <div className={`text-center py-12 rounded-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-lg font-semibold mb-2">No matching candidates found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setFilterScore(0);
              setFilterSkills([]);
            }}
            className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-colors duration-200`}
          >
            Clear All Filters
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.map((resume) => (
          <CandidateCard key={resume.id} candidate={resume} />
        ))}
      </div>
    </div>
  );
};

export default Candidates;