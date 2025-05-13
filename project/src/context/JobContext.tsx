import React, { createContext, useContext, useState, useEffect } from 'react';
import { JobDescription } from '../types/job';

interface JobContextType {
  jobDescription: JobDescription | null;
  setJobDescription: (job: JobDescription) => void;
  clearJobDescription: () => void;
}

const JobContext = createContext<JobContextType>({
  jobDescription: null,
  setJobDescription: () => {},
  clearJobDescription: () => {},
});

export const useJob = () => useContext(JobContext);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobDescription, setJobDescriptionState] = useState<JobDescription | null>(() => {
    const savedJob = localStorage.getItem('jobDescription');
    return savedJob ? JSON.parse(savedJob) : null;
  });

  useEffect(() => {
    if (jobDescription) {
      localStorage.setItem('jobDescription', JSON.stringify(jobDescription));
    } else {
      localStorage.removeItem('jobDescription');
    }
  }, [jobDescription]);

  const setJobDescription = (job: JobDescription) => {
    setJobDescriptionState(job);
  };

  const clearJobDescription = () => {
    setJobDescriptionState(null);
  };

  return (
    <JobContext.Provider
      value={{ jobDescription, setJobDescription, clearJobDescription }}
    >
      {children}
    </JobContext.Provider>
  );
};