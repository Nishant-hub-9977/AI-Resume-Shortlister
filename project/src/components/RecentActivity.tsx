import React from 'react';
import { Clock, FileText, UserPlus, FileCheck } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { useJob } from '../context/JobContext';
import { useTheme } from '../context/ThemeContext';

const RecentActivity: React.FC = () => {
  const { resumes } = useResume();
  const { jobDescription } = useJob();
  const { theme } = useTheme();

  // Generate activity items from resumes and job description
  const generateActivities = () => {
    const activities = [];

    if (jobDescription) {
      activities.push({
        id: 'job-1',
        type: 'job',
        title: 'Job Description Updated',
        detail: jobDescription.title,
        icon: <FileCheck className="w-5 h-5 text-blue-500" />,
        time: new Date(jobDescription.created).getTime(),
        timeString: formatTime(new Date(jobDescription.created))
      });
    }

    resumes.forEach(resume => {
      activities.push({
        id: resume.id,
        type: 'resume',
        title: 'Resume Analyzed',
        detail: resume.name,
        icon: <UserPlus className="w-5 h-5 text-purple-500" />,
        time: new Date(resume.date).getTime(),
        timeString: formatTime(new Date(resume.date))
      });
    });

    return activities.sort((a, b) => b.time - a.time).slice(0, 5);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.round(diffMs / 60000);
    const diffHrs = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMin < 60) {
      return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
    } else if (diffHrs < 24) {
      return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const activities = generateActivities();

  if (activities.length === 0) {
    return (
      <div className={`text-center py-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg`}>
        <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div 
          key={activity.id}
          className={`flex space-x-3 p-3 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200`}
        >
          <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            {activity.icon}
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{activity.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{activity.detail}</p>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3 mr-1" />
            {activity.timeString}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;