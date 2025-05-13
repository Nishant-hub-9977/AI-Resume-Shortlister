import React, { createContext, useContext, useState, useEffect } from 'react';
import { Resume } from '../types/resume';

interface ResumeContextType {
  resumes: Resume[];
  addResume: (resume: Resume) => void;
  addResumes: (resumes: Resume[]) => void;
  removeResume: (id: string) => void;
  clearResumes: () => void;
}

const ResumeContext = createContext<ResumeContextType>({
  resumes: [],
  addResume: () => {},
  addResumes: () => {},
  removeResume: () => {},
  clearResumes: () => {},
});

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumes, setResumes] = useState<Resume[]>(() => {
    const savedResumes = localStorage.getItem('resumes');
    return savedResumes ? JSON.parse(savedResumes) : [];
  });

  useEffect(() => {
    localStorage.setItem('resumes', JSON.stringify(resumes));
  }, [resumes]);

  const addResume = (resume: Resume) => {
    setResumes(prevResumes => [...prevResumes, resume]);
  };

  const addResumes = (newResumes: Resume[]) => {
    setResumes(prevResumes => [...prevResumes, ...newResumes]);
  };

  const removeResume = (id: string) => {
    setResumes(prevResumes => prevResumes.filter(resume => resume.id !== id));
  };

  const clearResumes = () => {
    setResumes([]);
  };

  return (
    <ResumeContext.Provider
      value={{ resumes, addResume, addResumes, removeResume, clearResumes }}
    >
      {children}
    </ResumeContext.Provider>
  );
};