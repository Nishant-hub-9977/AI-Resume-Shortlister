export interface Resume {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  experience: number;
  education: string;
  skills: string[];
  matchedSkills?: string[];
  score: number;
  summary: string;
  date: string;
  resume: string; // URL to resume file
}