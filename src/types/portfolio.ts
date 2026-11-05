export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  degree: string;
  college: string;
  cgpa: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  interests: string[];
  statusBadge: string;
  typingTitles: string[];
  resumeUrl: string;
  profilePhoto: string;
  subBlocks: {
    educationOverview: string;
    technicalInterests: string;
    careerGoals: string;
    personalDevelopment: string;
    academicJourney: string;
  };
}

export interface EducationItem {
  id: string;
  level: 'B.Tech' | '12th Grade' | '10th Grade' | string;
  degreeOrExam: string;
  institution: string;
  boardOrUniversity: string;
  scoreOrCgpa: string;
  period: string;
  status: 'In Progress' | 'Completed' | 'Placeholder';
  isPlaceholder: boolean;
  highlights?: string[];
}

export interface SkillItem {
  name: string;
  level: number | null; // null means "not set"
  iconName?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  presentationUrl?: string;
  liveUrl?: string;
  problemStatement?: string;
  objectives?: string[];
  technologies?: string[];
  methodology?: string;
  implementation?: string;
  results?: string; // "Add results" placeholder
  features?: string[];
  isFeatured?: boolean;
}

export type AchievementCategory =
  | 'Hackathons'
  | 'Technical Competitions'
  | 'Academic'
  | 'Chess'
  | 'Certifications'
  | 'Workshops';

export interface Achievement {
  id: string;
  title: string;
  category: AchievementCategory;
  date: string;
  event: string;
  roleOrResult: string;
  description: string;
  isEditableParticipation?: boolean;
}

export interface Certificate {
  id: string;
  courseName: string;
  issuer: string;
  completionDate: string;
  credentialId?: string;
  verificationLink?: string;
  imageUrl?: string;
}

export type ExperienceCategory =
  | 'Academic Projects'
  | 'Freelance Work'
  | 'Technical Learning'
  | 'Leadership'
  | 'Team Collaborations'
  | 'Personal Initiatives';

export interface ExperienceItem {
  id: string;
  category: ExperienceCategory;
  title: string;
  organization: string;
  period: string;
  location?: string;
  description: string;
  contributions: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}
