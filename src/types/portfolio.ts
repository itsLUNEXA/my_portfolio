export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  group?: string;
  status?: string;
  overview: string;
  problemStatement: string;
  proposedSolution: string;
  keyFeatures: string[];
  techStack: string[];
  role: string;
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPlaceholder?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  category?: string;
  credentialId?: string;
  imageUrl?: string;
  pdfUrl?: string;
  verificationUrl?: string;
  skillsLearned?: string[];
  isPlaceholder?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  eventOrOrganization: string;
  recognitionOrPosition: string;
  dateOrYear: string;
  description: string;
  category?: string;
  badge?: string;
  supportingUrl?: string;
  isPlaceholder?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    icon?: string;
  }[];
}

export interface AboutDetails {
  fullName: string;
  degree: string;
  college?: string;
  university: string;
  currentYear: string;
  graduationYear: string;
  bioParagraphs: string[];
  linkedinUrl: string;
  githubUrl: string;
  email: string;
  phone?: string;
  isPlaceholder?: boolean;
}
