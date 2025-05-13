import React, { useState } from 'react';
import { User, FileText, Award, Star, Clock, Mail, Phone, ExternalLink, Download, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Resume } from '../types/resume';
import GlassCard from './GlassCard';

interface CandidateCardProps {
  candidate: Resume;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <GlassCard className="animate-fade-in">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg transform transition-transform hover:scale-105">
                {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${getScoreColor(candidate.score)} flex items-center justify-center text-xs text-white font-bold border-2 ${theme === 'dark' ? 'border-gray-800' : 'border-white'} shadow-md`}>
                {Math.round(candidate.score)}
              </div>
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-lg group">
                {candidate.name}
                <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 inline" />
                </span>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.title}</p>
            </div>
          </div>
          <button 
            onClick={() => window.open(candidate.resume, '_blank')}
            className={`p-2 rounded-full transition-all duration-200 ${
              theme === 'dark' 
                ? 'hover:bg-gray-700 active:bg-gray-600' 
                : 'hover:bg-gray-100 active:bg-gray-200'
            }`}
            aria-label="Download resume"
          >
            <Download className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center group transition-colors duration-200 hover:text-primary-500">
            <Mail className="w-4 h-4 text-gray-400 mr-2 group-hover:text-primary-500 transition-colors duration-200" />
            <span className="truncate">{candidate.email}</span>
          </div>
          <div className="flex items-center group transition-colors duration-200 hover:text-primary-500">
            <Phone className="w-4 h-4 text-gray-400 mr-2 group-hover:text-primary-500 transition-colors duration-200" />
            <span>{candidate.phone}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-400 mr-2" />
            <span>{formatDate(candidate.date)}</span>
          </div>
          <div className="flex items-center">
            <Award className="w-4 h-4 text-gray-400 mr-2" />
            <span>{candidate.experience} years exp</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Skills Match</h4>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.slice(0, expanded ? undefined : 5).map((skill, index) => (
              <div 
                key={index} 
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs transition-all duration-200 ${
                  candidate.matchedSkills?.includes(skill) 
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 shadow-sm' 
                    : `${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'}`
                }`}
              >
                {candidate.matchedSkills?.includes(skill) && (
                  <Star className="w-3 h-3 mr-1 text-green-500 fill-current" />
                )}
                <span>{skill}</span>
              </div>
            ))}
            {!expanded && candidate.skills.length > 5 && (
              <button 
                onClick={() => setExpanded(true)}
                className="px-2 py-1 text-xs text-primary-500 hover:text-primary-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
              >
                +{candidate.skills.length - 5} more
              </button>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Match Summary</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {candidate.summary}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div className="flex space-x-1">
            <div 
              className={`w-full h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} flex`}
              style={{ width: '150px' }}
            >
              <div 
                className={`${getScoreColor(candidate.score)} transition-all duration-500 ease-out`} 
                style={{ width: `${candidate.score}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium">{candidate.score}% match</span>
          </div>
          
          <a
            href={`/candidates/${candidate.id}`}
            className="inline-flex items-center text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200"
          >
            View Profile
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </GlassCard>
  );
};

export default CandidateCard;