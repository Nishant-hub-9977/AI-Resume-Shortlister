import { Resume } from '../types/resume';

// Environment toggle to use mock or real API
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// ========== MOCK RESUME DATA (Demo Fallback) ========== //
const generateRandomId = () => Math.random().toString(36).substring(2, 15);

const getRandomElements = <T,>(array: T[], min: number, max: number): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

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

const analyzeResumeMock = async (filename: string): Promise<Resume> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const randomSkills = getRandomElements(skills, 4, 8);
  const matchedSkills = getRandomElements(randomSkills, 1, randomSkills.length);
  const experience = Math.floor(Math.random() * 10) + 1;
  const score = Math.floor(Math.random() * 65) + 35;

  let name = filename.replace(/\.(pdf|docx)$/, '').replace(/[_-]/g, ' ');
  name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

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
    summary: `${score > 75 ? 'Strong' : score > 60 ? 'Good' : score > 45 ? 'Average' : 'Weak'} candidate with ${experience} years of experience. ${matchedSkills.length ? `Matches ${matchedSkills.length} required skills.` : 'Does not match the required skills.'}`,
    date: new Date().toISOString(),
    resume: '#'
  };
};

// ========== REAL API FUNCTION ========== //
const API_URL = import.meta.env.VITE_API_URL;

const analyzeResumeAPI = async (filename: string): Promise<Resume> => {
  const response = await fetch(`${API_URL}/api/resumes/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename }),
  });

  if (!response.ok) {
    throw new Error('Resume analysis failed');
  }

  return await response.json();
};

// ========== Exported Function ========== //
export const analyzeResume = USE_MOCK ? analyzeResumeMock : analyzeResumeAPI;
