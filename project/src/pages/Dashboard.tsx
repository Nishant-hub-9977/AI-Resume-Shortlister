import React from 'react';
import { BarChart3, Users, FileText, Award } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { useJob } from '../context/JobContext';
import { useTheme } from '../context/ThemeContext';
import RecentActivity from '../components/RecentActivity';
import CandidateRanking from '../components/CandidateRanking';

const Dashboard: React.FC = () => {
  const { resumes } = useResume();
  const { jobDescription } = useJob();
  const { theme } = useTheme();
  
  const stats = [
    { 
      id: 1, 
      name: 'Total Resumes', 
      value: resumes.length, 
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      color: 'from-blue-400 to-blue-600' 
    },
    { 
      id: 2, 
      name: 'Shortlisted', 
      value: resumes.filter(r => r.score > 70).length, 
      icon: <Award className="w-6 h-6 text-purple-500" />,
      color: 'from-purple-400 to-purple-600' 
    },
    { 
      id: 3, 
      name: 'Average Score', 
      value: resumes.length > 0 ? `${Math.round(resumes.reduce((acc, r) => acc + r.score, 0) / resumes.length)}%` : '0%', 
      icon: <BarChart3 className="w-6 h-6 text-teal-500" />,
      color: 'from-teal-400 to-teal-600' 
    },
    { 
      id: 4, 
      name: 'Active Jobs', 
      value: jobDescription ? 1 : 0, 
      icon: <Users className="w-6 h-6 text-amber-500" />,
      color: 'from-amber-400 to-amber-600' 
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} hover:shadow-md transition-shadow duration-300 relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 rounded-full bg-gradient-to-br opacity-10"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`rounded-lg p-2 bg-gradient-to-br ${stat.color} shadow-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Candidates */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} p-6`}>
          <h2 className="text-lg font-semibold mb-4">Top Candidates</h2>
          <CandidateRanking limit={5} />
        </div>

        {/* Recent Activity */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} p-6`}>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;