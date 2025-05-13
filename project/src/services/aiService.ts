import { Resume } from '../types/resume';

// Mock data for demonstration purposes
const mockResumes: Resume[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    title: 'Senior Frontend Developer',
    experience: 5,
    education: 'Bachelor of Computer Science',
    skills: ['JavaScript', 'React', 'TypeScript', 'HTML', 'CSS', 'Node.js', 'GraphQL'],
    matchedSkills: ['JavaScript', 'React', 'TypeScript'],
    score: 85,
    summary: 'Strong match for the position with extensive experience in React and TypeScript. Has built multiple production applications with similar tech stack.',
    date: new Date().toISOString(),
    resume: '#'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '(555) 987-6543',
    title: 'Full Stack Engineer',
    experience: 3,
    education: 'Master of Information Technology',
    skills: ['JavaScript', 'Python', 'Django', 'React', 'SQL', 'Docker'],
    matchedSkills: ['JavaScript', 'React'],
    score: 72,
    summary: 'Good match with solid React experience. Has some gaps in TypeScript knowledge but shows strong problem-solving skills.',
    date: new Date().toISOString(),
    resume: '#'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(555) 456-7890',
    title: 'UI/UX Developer',
    experience: 4,
    education: 'Bachelor of Design',
    skills: ['JavaScript', 'React', 'Figma', 'UI/UX', 'CSS', 'Tailwind'],
    matchedSkills: ['JavaScript', 'React', 'CSS'],
    score: 68,
    summary: 'Strong on the design and UI implementation side. Less experienced with complex state management and TypeScript.',
    date: new Date().toISOString(),
    resume: '#'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '(555) 789-0123',
    title: 'Frontend Engineer',
    experience: 2,
    education: 'Bachelor of Engineering',
    skills: ['JavaScript', 'Angular', 'TypeScript', 'HTML', 'CSS', 'RxJS'],
    matchedSkills: ['JavaScript', 'TypeScript'],
    score: 61,
    summary: 'Good TypeScript knowledge but primarily Angular experience rather than React. Could adapt but would require some learning curve.',
    date: new Date().toISOString(),
    resume: '#'
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@example.com',
    phone: '(555) 234-5678',
    title: 'Software Engineer',
    experience: 6,
    education: 'Master of Computer Science',
    skills: ['Java', 'Spring', 'Python', 'MongoDB', 'Docker', 'Kubernetes'],
    matchedSkills: [],
    score: 35,
    summary: 'Strong backend skills but limited frontend experience. Not a good match for a React-focused role.',
    date: new Date().toISOString(),
    resume: '#'
  }
];

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Function to randomly choose elements from an array
const getRandomElements = <T,>(array: T[], min: number, max: number): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Simulated AI analysis for resumesFilled with data based on filename
export const analyzeResume = async (filename: string): Promise<Resume> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Create a resume with random data based on the filename
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'Node.js', 
    'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 
    'HTML', 'CSS', 'SASS', 'Tailwind', 'Bootstrap',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'GraphQL', 'REST',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD',
    'Git', 'Agile', 'Scrum', 'Jest', 'Mocha', 'Cypress'
  ];
  
  const titles = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Engineer',
    'UI/UX Developer', 'DevOps Engineer', 'Software Engineer',
    'Web Developer', 'Mobile Developer', 'Cloud Engineer'
  ];
  
  const randomSkills = getRandomElements(skills, 4, 8);
  const matchedSkills = getRandomElements(randomSkills, 0, randomSkills.length);
  const experience = Math.floor(Math.random() * 10) + 1;
  const score = Math.floor(Math.random() * 65) + 35; // Score between 35-100
  
  // Generate a name from the filename by removing extension and formatting
  let name = filename.replace(/\.(pdf|docx)$/, '').replace(/[_-]/g, ' ');
  // Capitalize each word
  name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  
  return {
    id: generateRandomId(),
    name,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    title: titles[Math.floor(Math.random() * titles.length)],
    experience,
    education: 'Bachelor of Science',
    skills: randomSkills,
    matchedSkills,
    score,
    summary: `${score > 75 ? 'Strong' : score > 60 ? 'Good' : score > 45 ? 'Average' : 'Weak'} candidate with ${experience} years of experience. ${matchedSkills.length > 0 ? `Matches ${matchedSkills.length} required skills.` : 'Does not match the required skills.'}`,
    date: new Date().toISOString(),
    resume: '#'
  };
};