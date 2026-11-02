'use client';

import React, { useState, useEffect } from 'react';
import { StudentProfile } from '@/lib/types';
import { Compass, Sparkles, CheckCircle2, ArrowRight, RotateCcw, Target, BookOpen, AlertCircle } from 'lucide-react';

interface PersonalizedGuidanceProps {
  studentProfile: StudentProfile | null;
  onAskAI: (prompt: string) => void;
  onSetGoal: (careerTitle: string) => void;
  onOpenProfile: () => void;
}

interface AssessmentAnswers {
  educationLevel: string;
  subjects: string[];
  interests: string[];
  workPreference: 'technical' | 'creative' | 'business' | 'social' | 'practical';
  careerGoal: string;
  budget: 'budget' | 'moderate' | 'flexible';
}

interface RecommendationResult {
  topFields: string[];
  suggestedCourses: string[];
  recommendedCareers: { title: string; matchReason: string; startingSalary: string }[];
  backupPathways: string[];
  analysisSummary: string;
}

export default function PersonalizedGuidance({
  studentProfile,
  onAskAI,
  onSetGoal,
  onOpenProfile,
}: PersonalizedGuidanceProps) {
  const [answers, setAnswers] = useState<AssessmentAnswers>(() => {
    if (studentProfile) {
      return {
        educationLevel: studentProfile.currentLevel || 'Class 11th-12th',
        subjects: studentProfile.favoriteSubjects.length > 0 ? studentProfile.favoriteSubjects : ['Mathematics', 'Computer Science'],
        interests: studentProfile.interests.length > 0 ? studentProfile.interests : ['Technology & Coding', 'Problem Solving'],
        workPreference: studentProfile.preferredStyle || 'technical',
        careerGoal: studentProfile.careerGoal || 'Software Engineer',
        budget:
          studentProfile.budgetPreference === 'budget' ||
          studentProfile.budgetPreference === 'moderate' ||
          studentProfile.budgetPreference === 'flexible'
            ? studentProfile.budgetPreference
            : 'moderate',
      };
    }
    return {
      educationLevel: 'Class 11th-12th',
      subjects: ['Mathematics', 'Computer Science'],
      interests: ['Technology & Coding', 'Problem Solving'],
      workPreference: 'technical',
      careerGoal: 'Software Engineer',
      budget: 'moderate',
    };
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const toggleSubject = (sub: string) => {
    if (answers.subjects.includes(sub)) {
      setAnswers({ ...answers, subjects: answers.subjects.filter((s) => s !== sub) });
    } else {
      setAnswers({ ...answers, subjects: [...answers.subjects, sub] });
    }
  };

  const toggleInterest = (interest: string) => {
    if (answers.interests.includes(interest)) {
      setAnswers({ ...answers, interests: answers.interests.filter((i) => i !== interest) });
    } else {
      setAnswers({ ...answers, interests: [...answers.interests, interest] });
    }
  };

  const calculateRecommendations = () => {
    const isTech =
      answers.workPreference === 'technical' ||
      answers.subjects.includes('Mathematics') ||
      answers.subjects.includes('Computer Science') ||
      answers.interests.some((i) => i.toLowerCase().includes('coding') || i.toLowerCase().includes('robotics'));

    const isBio =
      answers.subjects.includes('Biology') ||
      answers.subjects.includes('Chemistry') ||
      answers.interests.some((i) => i.toLowerCase().includes('health') || i.toLowerCase().includes('anatomy'));

    const isBiz =
      answers.workPreference === 'business' ||
      answers.subjects.includes('Accountancy') ||
      answers.subjects.includes('Economics') ||
      answers.interests.some((i) => i.toLowerCase().includes('finance') || i.toLowerCase().includes('startup'));

    const isCreative =
      answers.workPreference === 'creative' ||
      answers.subjects.includes('Art') ||
      answers.subjects.includes('English Literature') ||
      answers.interests.some((i) => i.toLowerCase().includes('design') || i.toLowerCase().includes('writing'));

    let rec: RecommendationResult;

    if (isTech && !isBio) {
      rec = {
        topFields: ['Computer Science & Software', 'Data Science & AI', 'Applied Engineering'],
        suggestedCourses: [
          answers.budget === 'budget' ? 'BCA (3 Years) or Govt Polytechnic Diploma' : 'B.Tech in Computer Science & Engineering (4 Years)',
          'B.Sc in Data Science & Artificial Intelligence',
          'IIT Madras Online BS in Data Science (Flexible & Scalable Fee)',
        ],
        recommendedCareers: [
          {
            title: 'Software Developer / Engineer',
            matchReason: 'Direct alignment with your love for Mathematics and analytical computing logic.',
            startingSalary: '₹6 - 18 LPA',
          },
          {
            title: 'Data Analyst & BI Specialist',
            matchReason: 'Combines structured logical problem solving with real-world decision impact.',
            startingSalary: '₹5 - 12 LPA',
          },
          {
            title: 'Cloud DevOps / Infrastructure Engineer',
            matchReason: 'High demand technical specialization with rapid promotional trajectories.',
            startingSalary: '₹6 - 14 LPA',
          },
        ],
        backupPathways: [
          'If entrance cutoffs are high for B.Tech, pursue BCA followed by MCA or off-campus portfolio hiring.',
          'Polytechnic Diploma in Computer Engineering allows direct lateral entry into 2nd year B.Tech.',
        ],
        analysisSummary: `Based on your analytical strengths in ${answers.subjects.join(', ') || 'quantitative areas'}, your optimal educational avenue is technical software architecture and computing.`,
      };
    } else if (isBio) {
      rec = {
        topFields: ['Clinical Medicine', 'Pharmaceutical Sciences', 'Allied Health & Biotechnology'],
        suggestedCourses: [
          'MBBS (5.5 Years via NEET-UG)',
          'B.Pharm (Bachelor of Pharmacy - 4 Years)',
          'B.Sc Nursing / BPT (Physiotherapy)',
          'B.Sc Biotechnology & Clinical Genetics',
        ],
        recommendedCareers: [
          {
            title: 'Medical Doctor (Physician / Surgeon)',
            matchReason: 'Lifelong clinical service and diagnosis matching your commitment to life sciences.',
            startingSalary: '₹8 - 16 LPA',
          },
          {
            title: 'Clinical Pharmacist & Drug Researcher',
            matchReason: 'Direct application of Chemistry and Biology without mandatory 10-year surgical residency.',
            startingSalary: '₹4.5 - 9 LPA',
          },
          {
            title: 'Physiotherapist / Sports Rehabilitation',
            matchReason: 'Rapidly expanding private clinical wellness and physical medicine practice.',
            startingSalary: '₹4 - 8 LPA',
          },
        ],
        backupPathways: [
          'If NEET scores fall short of government MBBS, choose B.Pharm or Physiotherapy rather than taking multiple expensive gap years.',
          'Look into clinical diagnostic lab diplomas (BMLT) for early financial self-reliance.',
        ],
        analysisSummary: `Your passion for life sciences and ${answers.interests.join(', ') || 'healthcare'} points toward clinical medicine, with rich allied healthcare alternatives ensuring zero career dead-ends.`,
      };
    } else if (isBiz) {
      rec = {
        topFields: ['Accounting & Corporate Taxation', 'Strategic Management & Consulting', 'FinTech & Banking'],
        suggestedCourses: [
          'B.Com (Honours) alongside Chartered Accountancy (ICAI)',
          'BBA / BMS in Finance or Marketing',
          'Integrated 5-Year IPM (IIMs) or CFA Program',
        ],
        recommendedCareers: [
          {
            title: 'Chartered Accountant (CA)',
            matchReason: 'Preeminent statutory authority in taxation, corporate governance, and auditing.',
            startingSalary: '₹8 - 20 LPA',
          },
          {
            title: 'Financial & Investment Analyst',
            matchReason: 'Evaluates capital investments, stocks, and corporate balance sheet models.',
            startingSalary: '₹6 - 15 LPA',
          },
          {
            title: 'Product & Business Development Manager',
            matchReason: 'Connects market customer demand with company product strategy.',
            startingSalary: '₹7 - 18 LPA',
          },
        ],
        backupPathways: [
          'If private BBA tuition is beyond budget, pursue B.Com in an accredited state college and self-study CA/CFA.',
          'State university merit lists require no coaching fees and provide a solid foundation for CAT/MBA.',
        ],
        analysisSummary: `Your commercial mindset and orientation toward ${answers.interests.join(', ') || 'business'} indicate strong aptitude for corporate finance, auditing, and leadership management.`,
      };
    } else if (isCreative) {
      rec = {
        topFields: ['UI / UX & Product Design', 'Digital Media & Journalism', 'Content Strategy & Creative Direction'],
        suggestedCourses: [
          'Bachelor of Design (B.Des via NID/UCEED)',
          'BA in Journalism & Mass Communication (BJMC)',
          'BA in Psychology & Cognitive Behavior',
        ],
        recommendedCareers: [
          {
            title: 'UI / UX Product Designer',
            matchReason: 'Combines user empathy, visual ergonomics, and high-income tech industry demand.',
            startingSalary: '₹5 - 14 LPA',
          },
          {
            title: 'Content Strategist & Digital Journalist',
            matchReason: 'Crafts persuasive narratives across print, podcasts, and digital broadcast channels.',
            startingSalary: '₹4 - 10 LPA',
          },
          {
            title: 'Brand Creative Director',
            matchReason: 'Shapes public perceptions and visual identity for enterprises and social campaigns.',
            startingSalary: '₹6 - 16 LPA',
          },
        ],
        backupPathways: [
          'UI/UX design hires strictly on portfolio quality; you can study an affordable BA/B.Sc and build Figma case studies.',
          'Start freelance writing or social media marketing during college to earn while learning.',
        ],
        analysisSummary: `Your creative inclinations and expressive communication style align closely with modern digital product design, media storytelling, and psychological strategy.`,
      };
    } else {
      rec = {
        topFields: ['Public Administration & Civil Services', 'Interdisciplinary Technology', 'Applied Management'],
        suggestedCourses: [
          'Integrated BA-LLB (5-Year Law)',
          'B.Sc in Applied Mathematics / Data Analytics',
          'BA in Economics & Public Policy',
        ],
        recommendedCareers: [
          {
            title: 'Civil Services Officer (IAS / IPS)',
            matchReason: 'Direct societal transformation, public policy, and administrative leadership.',
            startingSalary: 'Level 10 Pay Matrix + Official Quarters',
          },
          {
            title: 'Corporate Legal Advisor / Litigator',
            matchReason: 'High analytical rigor protecting corporate contracts and civil rights.',
            startingSalary: '₹6 - 16 LPA',
          },
          {
            title: 'Data & Systems Analyst',
            matchReason: 'Versatile analytical role applicable across public and private enterprises.',
            startingSalary: '₹5 - 12 LPA',
          },
        ],
        backupPathways: [
          'If national entrance tests prove competitive, state subordinate exams and bank PO tests offer dependable security.',
          'Online degree options (IGNOU / State Open Universities) allow simultaneous competitive exam preparation.',
        ],
        analysisSummary: `Your balanced profile offers exceptional flexibility between public administration, legal systems, and modern corporate consulting.`,
      };
    }

    setResult(rec);
  };

  const subjectOptions = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Accountancy',
    'Economics',
    'Business Studies',
    'History',
    'Political Science',
    'Psychology',
    'English Literature',
  ];

  const interestOptions = [
    'Technology & Coding',
    'Problem Solving',
    'Healthcare & Biology',
    'Stock Market & Finance',
    'Art & Visual Design',
    'Public Speaking & Debate',
    'Writing & Journalism',
    'Robotics & Machinery',
    'Social Work & Teaching',
    'Startups & Business',
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center space-y-3">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#546057]">
          03 · Core Feature
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e352b] tracking-tight">
          Personalized Career Guidance
        </h2>
        <p className="text-sm sm:text-base text-[#465149] max-w-2xl mx-auto leading-relaxed">
          Answer 6 thoughtful questions to receive objective, data-backed career suggestions tailored
          to your exact interests, subject strengths, and budget.
        </p>
      </div>

      {/* Main Assessment Container */}
      {!result ? (
        <div className="bg-white rounded-xl border border-[#ded7cc] shadow-sm p-6 sm:p-8 space-y-8">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-[#eee8df] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1e352b] text-white flex items-center justify-center text-xs font-bold">
                {currentStep}
              </span>
              <span className="text-xs font-medium text-[#465149]">
                Step {currentStep} of 3 · {currentStep === 1 ? 'Academics & Level' : currentStep === 2 ? 'Interests & Work Style' : 'Goals & Budget'}
              </span>
            </div>
            {studentProfile?.name && (
              <span className="text-[11px] text-[#284437] font-medium bg-[#eef4f0] px-2.5 py-1 rounded-sm border border-[#cbe0d3]">
                Pre-filled from {studentProfile.name}&apos;s profile
              </span>
            )}
          </div>

          {/* STEP 1: Current Level & Favorite Subjects */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1e352b] mb-2">
                  1. What is your current education level?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {['Class 9th-10th', 'Class 11th-12th', 'Undergraduate', 'Graduate'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setAnswers({ ...answers, educationLevel: lvl })}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        answers.educationLevel === lvl
                          ? 'bg-[#1e352b] text-white border-[#1e352b] font-medium shadow-xs'
                          : 'bg-[#faf8f5] text-[#3c4740] border-[#ded7cc] hover:bg-[#ede7dc]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-[#1e352b]">
                    2. Which subjects do you enjoy the most?
                  </label>
                  <span className="text-[11px] text-[#6b7770]">Select all that apply</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                  {subjectOptions.map((sub) => {
                    const isSelected = answers.subjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubject(sub)}
                        className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#284437] text-white border-[#284437] font-medium'
                            : 'bg-[#faf8f5] text-[#3c4740] border-[#ded7cc] hover:bg-[#ede7dc]'
                        }`}
                      >
                        <span>{sub}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#e8a36e]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#eee8df]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-[#1e352b] text-white hover:bg-[#28473a]"
                >
                  <span>Continue to Interests</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Interests & Preferred Work Style */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-[#1e352b]">
                    3. What are your core interests and activities?
                  </label>
                  <span className="text-[11px] text-[#6b7770]">Select all that apply</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {interestOptions.map((int) => {
                    const isSelected = answers.interests.includes(int);
                    return (
                      <button
                        key={int}
                        type="button"
                        onClick={() => toggleInterest(int)}
                        className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#284437] text-white border-[#284437] font-medium'
                            : 'bg-[#faf8f5] text-[#3c4740] border-[#ded7cc] hover:bg-[#ede7dc]'
                        }`}
                      >
                        <span>{int}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#e8a36e]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1e352b] mb-2">
                  4. Do you prefer technical, creative, or business-related work?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    {
                      id: 'technical',
                      label: 'Technical & Analytical',
                      desc: 'Working with software, math, algorithms, systems, or scientific formulas.',
                    },
                    {
                      id: 'creative',
                      label: 'Creative & Media',
                      desc: 'Designing interfaces, multimedia storytelling, writing, art, or psychology.',
                    },
                    {
                      id: 'business',
                      label: 'Business & Management',
                      desc: 'Finance, corporate operations, marketing, startups, and public administration.',
                    },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() =>
                        setAnswers({
                          ...answers,
                          workPreference: style.id as AssessmentAnswers['workPreference'],
                        })
                      }
                      className={`p-3.5 rounded-lg border text-left transition-all space-y-1 ${
                        answers.workPreference === style.id
                          ? 'bg-[#1e352b] text-white border-[#1e352b] font-medium shadow-xs'
                          : 'bg-[#faf8f5] text-[#38423b] border-[#ded7cc] hover:bg-[#ede7dc]'
                      }`}
                    >
                      <div className="font-bold text-xs">{style.label}</div>
                      <div className={`text-[11px] leading-tight ${answers.workPreference === style.id ? 'text-[#d6e5db]' : 'text-[#647167]'}`}>
                        {style.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#eee8df]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs font-medium text-[#5c6860] hover:text-[#1e352b]"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-[#1e352b] text-white hover:bg-[#28473a]"
                >
                  <span>Continue to Goals & Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Goal & Budget */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1e352b] mb-1.5">
                  5. What is your future career goal or aspirational dream?
                </label>
                <input
                  type="text"
                  value={answers.careerGoal}
                  onChange={(e) => setAnswers({ ...answers, careerGoal: e.target.value })}
                  placeholder="e.g. Software Developer, Doctor, Data Scientist, IAS Officer, CA, UI Designer..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-[#faf8f5] border border-[#d8d1c3] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
                />
                <p className="text-[11px] text-[#6e7b73] mt-1">
                  If undecided, write &quot;Exploring options&quot; or your general curiosity area.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1e352b] mb-2">
                  6. What is your preferred education budget?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    {
                      id: 'budget',
                      label: 'Budget-Friendly / Govt Colleges',
                      desc: '< ₹50,000 / year (State colleges, IITs/NITs with waivers, Polytechnic, Scholarships)',
                    },
                    {
                      id: 'moderate',
                      label: 'Moderate Tier',
                      desc: '₹50,000 - ₹2,00,000 / year (Standard universities & reputable regional colleges)',
                    },
                    {
                      id: 'flexible',
                      label: 'Flexible / Private Colleges',
                      desc: 'Willing to explore private institutions or education financing loans',
                    },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() =>
                        setAnswers({ ...answers, budget: b.id as AssessmentAnswers['budget'] })
                      }
                      className={`p-3.5 rounded-lg border text-left transition-all space-y-1 ${
                        answers.budget === b.id
                          ? 'bg-[#1e352b] text-white border-[#1e352b] font-medium shadow-xs'
                          : 'bg-[#faf8f5] text-[#38423b] border-[#ded7cc] hover:bg-[#ede7dc]'
                      }`}
                    >
                      <div className="font-bold text-xs">{b.label}</div>
                      <div className={`text-[11px] leading-tight ${answers.budget === b.id ? 'text-[#d6e5db]' : 'text-[#647167]'}`}>
                        {b.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#eee8df]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-xs font-medium text-[#5c6860] hover:text-[#1e352b]"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={calculateRecommendations}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-md bg-[#1e352b] text-white hover:bg-[#28473a] shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#e8a36e]" />
                  <span>Generate Career Suggestions</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-white rounded-xl border border-[#ded7cc] shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eee8df]">
            <div>
              <div className="text-xs font-semibold text-[#856126] uppercase tracking-wider">
                Personalized Assessment Result
              </div>
              <h3 className="text-xl font-bold font-serif text-[#1e352b]">
                Recommended Pathways for Your Profile
              </h3>
            </div>
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#5c6860] hover:text-[#1e352b] rounded-md bg-[#faf8f5] border border-[#d8d1c3]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Questions</span>
            </button>
          </div>

          {/* Analysis Summary */}
          <div className="p-4 rounded-lg bg-[#eef4f0] border border-[#d3e2d8] text-xs sm:text-sm text-[#1e352b] leading-relaxed">
            {result.analysisSummary}
          </div>

          {/* Top Fields */}
          <div>
            <span className="text-xs font-bold text-[#55635b] uppercase tracking-wider block mb-2">
              Top Aligned Fields
            </span>
            <div className="flex flex-wrap gap-2">
              {result.topFields.map((f, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-sm bg-[#faf8f5] border border-[#d8d1c3] text-xs font-semibold text-[#1e352b]"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Careers */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#55635b] uppercase tracking-wider block">
              Suggested Career Options
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.recommendedCareers.map((c, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-[#faf8f5] border border-[#ded7cc] flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#856126] font-medium mb-1">
                      <span>Option {idx + 1}</span>
                      <span>{c.startingSalary}</span>
                    </div>
                    <h4 className="font-bold font-serif text-sm text-[#1e352b]">{c.title}</h4>
                    <p className="text-xs text-[#4b574f] mt-1 leading-normal">{c.matchReason}</p>
                  </div>
                  <button
                    onClick={() => onSetGoal(c.title)}
                    className="w-full py-1.5 text-xs font-medium rounded-md bg-white border border-[#d8d1c3] text-[#1e352b] hover:bg-[#1e352b] hover:text-white transition-colors"
                  >
                    Track in Goal Planner
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Degree Courses */}
          <div className="p-4 rounded-lg bg-[#faf8f5] border border-[#ded7cc] space-y-2">
            <span className="text-xs font-bold text-[#1e352b] block uppercase tracking-wider">
              Relevant Degree & Course Pathways
            </span>
            <ul className="space-y-1.5 text-xs text-[#3a443e]">
              {result.suggestedCourses.map((crs, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#284437] mt-0.5 shrink-0" />
                  <span>{crs}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternative Backups */}
          <div className="p-4 rounded-lg bg-[#faf6ee] border border-[#eddcc7] space-y-2">
            <span className="text-xs font-bold text-[#7a4918] block uppercase tracking-wider">
              Alternative Backup Plan
            </span>
            <ul className="space-y-1 text-xs text-[#543b22]">
              {result.backupPathways.map((bp, i) => (
                <li key={i}>• {bp}</li>
              ))}
            </ul>
          </div>

          {/* Note Banner */}
          <div className="flex items-start gap-2 p-3 bg-stone-50 rounded-md text-[11px] text-[#69756e]">
            <AlertCircle className="w-4 h-4 text-[#8a6833] shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> These suggestions are generated to help you explore your options
              based on your inputs, not final career decisions. Use them as a launchpad to research,
              compare colleges, and speak with mentors.
            </span>
          </div>

          {/* Action to Deep Dive with Gemini AI */}
          <div className="pt-4 border-t border-[#eee8df] flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() =>
                onAskAI(
                  `I took PathFinder's career assessment. My top suggested careers are: ${result.recommendedCareers.map((c) => c.title).join(', ')}. My education level is ${answers.educationLevel}, favorite subjects are ${answers.subjects.join(', ')}, and budget is ${answers.budget}. Please provide an in-depth counseling analysis and step-by-step preparation plan.`
                )
              }
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-[#1e352b] text-white hover:bg-[#28473a] shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e8a36e]" />
              <span>Discuss Results with Gemini AI Mentor</span>
            </button>

            <button
              onClick={onOpenProfile}
              className="text-xs font-medium text-[#5c6860] hover:text-[#1e352b] underline"
            >
              Update My Student Profile →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
