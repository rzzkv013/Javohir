export type ProjectCategory = 
  | 'all' 
  | 'web' 
  | 'ecommerce' 
  | 'telegram' 
  | 'gameserver';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  fullDescription: string;
  features: string[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  color: string;
  badge: string;
  metrics?: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'styling' | 'backend-tools' | 'languages';
  level: number;
  iconName: string;
  color: string;
  description: string;
  experienceYears: string;
  highlight?: boolean;
}

export interface TimelineItem {
  year: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  type: 'work' | 'education' | 'achievement';
  description: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  handle: string;
  color: string;
}
