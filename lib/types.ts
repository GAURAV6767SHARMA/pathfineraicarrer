export interface StudentProfile {
  name: string;
  email?: string;
  currentLevel: string; // e.g., 'Class 10th', 'Class 11th-12th', 'Undergraduate', 'Graduate'
  stream?: string; // 'Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts/Humanities', 'Diploma/Vocational', 'Other'
  previousMarks?: string; // e.g., '85%' or '8.4 CGPA'
  favoriteSubjects: string[];
  interests: string[];
  preferredStyle: 'technical' | 'creative' | 'business' | 'social' | 'practical';
  careerGoal: string;
  budgetPreference: 'budget' | 'moderate' | 'flexible' | 'premium';
  skills: string[];
  projectsAndAchievements: string;
  financialAssistanceNeeded: boolean;
}

export interface EducationOption {
  id: string;
  title: string;
  category: 'after-10th' | 'after-12th' | 'after-graduation';
  stream?: string;
  duration: string;
  eligibility: string;
  description: string;
  coreSubjectsOrCourses: string[];
  futureOpportunities: string[];
  alternativeBackups: string[];
  estimatedCostRange: string;
}

export interface CareerOption {
  id: string;
  title: string;
  field: 'Technology' | 'Medical & Healthcare' | 'Business & Finance' | 'Government & Public' | 'Creative & Media' | 'Engineering';
  description: string;
  requiredQualifications: string;
  essentialSkills: string[];
  relevantCourses: string[];
  entranceExams: string[];
  careerOpportunities: string[];
  furtherStudyOptions: string[];
  averageStartingSalary: string;
  growthOutlook: string;
}

export interface CourseComparison {
  id: string;
  name: string;
  shortName: string;
  category: string;
  duration: string;
  focus: string;
  eligibility: string;
  approxFees: string;
  admissionProcess: string;
  entranceExams: string[];
  careerOpportunities: string[];
  higherStudies: string[];
  pros: string[];
  cons: string[];
  idealFor: string;
}

export interface EntranceExam {
  id: string;
  name: string;
  fullName: string;
  category: 'Engineering' | 'Medical' | 'Central Universities' | 'Law' | 'Management' | 'Civil/Govt' | 'Defense';
  eligibility: string;
  purpose: string;
  applicationPeriod: string;
  examPattern: string;
  officialWebsite: string;
  keyTips: string[];
}

export interface ScholarshipInfo {
  id: string;
  name: string;
  provider: string;
  type: 'Government' | 'Merit-Based' | 'Need-Based' | 'State / Regional' | 'Corporate / Foundation';
  eligibility: string;
  awardDetails: string;
  applicationDeadline: string;
  howToApply: string;
  officialUrl?: string;
}

export interface SkillRoadmap {
  id: string;
  title: string;
  domain: string;
  overview: string;
  stages: {
    step: number;
    title: string;
    description: string;
    recommendedTools: string[];
    freeResources: { name: string; url: string }[];
  }[];
}

export interface CareerGoalPlan {
  id: string;
  careerTitle: string;
  targetYear: string;
  currentMilestoneIndex: number;
  steps: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate?: string;
  }[];
  customNotes?: string;
}

export interface ExpertProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  experienceYears: number;
  expertise: string[];
  sessionDuration: string;
  consultationFee: number;
  bio: string;
  availability: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
