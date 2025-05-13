import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Award } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { useTheme } from '../context/ThemeContext';

interface CandidateRankingProps {
  limit?: number;
}

const CandidateRanking: React.FC<CandidateRankingProps> = ({ limit = 3 }) => {
  const { resumes } = useResume();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const sortedResumes = [...resumes]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (resumes.length === 0) {
    return (
      <div className={`text-center py-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg`}>
        <p className="text-gray-500 dark:text-gray-400">No resumes have been analyzed yet</p>
        <button
          onClick={() => navigate('/upload')}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          Upload resumes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedResumes.map((resume, index) => (
        <div 
          key={resume.id}
          className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer`}
          onClick={() => navigate(`/candidates`)}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white ${index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-700' : 'bg-gray-500'}`}>
              {index + 1}
            </div>
            <div>
              <h3 className="font-medium">{resume.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{resume.title}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-1 mr-2">
              {resume.score}%
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      ))}

      {resumes.length > limit && (
        <button
          onClick={() => navigate('/candidates')}
          className={`w-full py-2 text-center text-sm ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg transition-colors duration-200`}
        >
          View all candidates
        </button>
      )}
    </div>
  );
};

export default CandidateRanking;