'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, User, Sparkles, BookOpen, Wallet, Target, Award, Wrench } from 'lucide-react';
import { StudentProfile } from '@/lib/types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile | null;
  onSaveProfile: (profile: StudentProfile) => void;
}

const DEFAULT_PROFILE: StudentProfile = {
  name: '',
  email: '',
  currentLevel: 'Class 11th-12th',
  stream: 'Science (PCM)',
  previousMarks: '85%',
  favoriteSubjects: ['Mathematics', 'Physics'],
  interests: ['Technology & Coding', 'Problem Solving'],
  preferredStyle: 'technical',
  careerGoal: 'Software Engineer',
  budgetPreference: 'moderate',
  skills: ['Python basics', 'Logical Thinking'],
  projectsAndAchievements: 'Built a simple school calculator program; 2nd place in Science Fair',
  financialAssistanceNeeded: false,
};

const SAMPLE_STUDENTS: { label: string; profile: StudentProfile }[] = [
  {
    label: 'Science Student (Engineering)',
    profile: {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      currentLevel: 'Class 11th-12th',
      stream: 'Science (PCM)',
      previousMarks: '88% in 10th Board',
      favoriteSubjects: ['Mathematics', 'Physics', 'Computer Science'],
      interests: ['Coding & Robotics', 'Video Games', 'System Design'],
      preferredStyle: 'technical',
      careerGoal: 'Software Developer',
      budgetPreference: 'moderate',
      skills: ['Python', 'Problem Solving', 'Calculus'],
      projectsAndAchievements: 'Built an attendance tracker website in HTML/JS; participated in Hackathon',
      financialAssistanceNeeded: false,
    },
  },
  {
    label: 'Medical Aspirant',
    profile: {
      name: 'Ananya Patel',
      email: 'ananya.p@example.com',
      currentLevel: 'Class 11th-12th',
      stream: 'Science (PCB)',
      previousMarks: '91% in 10th Board',
      favoriteSubjects: ['Biology', 'Chemistry'],
      interests: ['Human Anatomy', 'Healthcare', 'Volunteering in clinics'],
      preferredStyle: 'practical',
      careerGoal: 'Medical Doctor / MBBS',
      budgetPreference: 'budget',
      skills: ['Biology diagramming', 'Active Listening', 'Empathy'],
      projectsAndAchievements: 'School Science Olympiad Gold Medal; Volunteer at Red Cross blood drive',
      financialAssistanceNeeded: true,
    },
  },
  {
    label: 'Commerce & Finance Aspirant',
    profile: {
      name: 'Rohan Mehra',
      email: 'rohan.m@example.com',
      currentLevel: 'Class 11th-12th',
      stream: 'Commerce',
      previousMarks: '82% in 10th Board',
      favoriteSubjects: ['Accountancy', 'Economics', 'Business Studies'],
      interests: ['Stock Market', 'Business Case Studies', 'Startups'],
      preferredStyle: 'business',
      careerGoal: 'Chartered Accountant (CA)',
      budgetPreference: 'moderate',
      skills: ['Excel basics', 'Balance Sheet Analysis', 'Communication'],
      projectsAndAchievements: 'Managed school festival merchandise budget; Completed virtual stock trading simulation',
      financialAssistanceNeeded: false,
    },
  },
];

export default function ProfileModal({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
}: ProfileModalProps) {
  const [formData, setFormData] = useState<StudentProfile>(() => currentProfile || DEFAULT_PROFILE);
  const [subjectInput, setSubjectInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter your name.');
      return;
    }
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const loadSample = (sample: StudentProfile) => {
    setFormData(sample);
  };

  const addTag = (
    field: 'favoriteSubjects' | 'interests' | 'skills',
    val: string,
    setVal: (v: string) => void
  ) => {
    if (!val.trim()) return;
    if (!formData[field].includes(val.trim())) {
      setFormData({
        ...formData,
        [field]: [...formData[field], val.trim()],
      });
    }
    setVal('');
  };

  const removeTag = (field: 'favoriteSubjects' | 'interests' | 'skills', tag: string) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((t) => t !== tag),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-2xl rounded-xl border border-[#ded7cc] shadow-2xl overflow-hidden transition-all my-8">
        {/* Header */}
        <div className="bg-[#1e352b] text-[#f2ede4] px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#e8a36e]" />
              <h2 className="text-lg font-bold font-serif tracking-tight">
                {currentProfile?.name ? 'Edit Student Profile' : 'Create Your Student Profile'}
              </h2>
            </div>
            <p className="text-xs text-[#c2d6c9] mt-1">
              Personalize recommendations, course matches, and Gemini AI career counseling.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#c2d6c9] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Sample Selector */}
        <div className="bg-[#f0ebe0] px-6 py-3 border-b border-[#ded7cc] flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-medium text-[#4c554e]">Quick prefill templates:</span>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_STUDENTS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadSample(item.profile)}
                className="px-2.5 py-1 rounded-sm bg-white border border-[#cfc8bd] text-[#2c332e] hover:bg-[#1e352b] hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[72vh] overflow-y-auto text-[#24211d]">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#546057] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Priya Sharma"
                className="w-full px-3 py-2 text-sm rounded-md bg-white border border-[#d8d1c5] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#546057] mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. priya@example.com"
                className="w-full px-3 py-2 text-sm rounded-md bg-white border border-[#d8d1c5] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
              />
            </div>
          </div>

          {/* Academic Background */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#546057] mb-1">
                Current Education Level
              </label>
              <select
                value={formData.currentLevel}
                onChange={(e) => setFormData({ ...formData, currentLevel: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-md bg-white border border-[#d8d1c5] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
              >
                <option value="Class 9th-10th">Class 9th - 10th</option>
                <option value="Class 11th-12th">Class 11th - 12th</option>
                <option value="Undergraduate">Undergraduate Student</option>
                <option value="Graduate / Post-Grad">Graduate / Post-Grad</option>
                <option value="Polytechnic / ITI">Polytechnic / ITI</option>
                <option value="Working Professional">Working Professional</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#546057] mb-1">
                Current / Desired Stream
              </label>
              <select
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-md bg-white border border-[#d8d1c5] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
              >
                <option value="Science (PCM)">Science (PCM - Math)</option>
                <option value="Science (PCB)">Science (PCB - Biology)</option>
                <option value="Science (PCMB)">Science (PCMB - Both)</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts/Humanities">Arts / Humanities</option>
                <option value="Polytechnic / Engineering Diploma">Polytechnic Diploma</option>
                <option value="Vocational / ITI">Vocational / ITI</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#546057] mb-1">
                Previous Marks / CGPA
              </label>
              <input
                type="text"
                value={formData.previousMarks || ''}
                onChange={(e) => setFormData({ ...formData, previousMarks: e.target.value })}
                placeholder="e.g. 86% or 8.5 CGPA"
                className="w-full px-3 py-2 text-sm rounded-md bg-white border border-[#d8d1c5] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
              />
            </div>
          </div>

          {/* Target Goal & Work Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#546057] mb-1">
                Future Career Goal
              </label>
              <input
                type="text"
                value={formData.careerGoal}
                onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                placeholder="e.g. Software Developer, Doctor, CA, IAS..."
                className="w-full px-3 py-2 text-sm rounded-md bg-white border border-[#d8d1c5] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#546057] mb-1">
                Preferred Work Style
              </label>
              <select
                value={formData.preferredStyle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferredStyle: e.target.value as StudentProfile['preferredStyle'],
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-md bg-white border border-[#d8d1c5] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
              >
                <option value="technical">Technical & Analytical (Code, Math, Logic)</option>
                <option value="creative">Creative & Expressive (Design, Writing, Media)</option>
                <option value="business">Business & Leadership (Finance, Management)</option>
                <option value="social">Social & People-Oriented (Teaching, Law, Medicine)</option>
                <option value="practical">Practical & Hands-On (Machinery, Lab, Fieldwork)</option>
              </select>
            </div>
          </div>

          {/* Favorite Subjects */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#546057] mb-1">
              Favorite / Strong Subjects
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag('favoriteSubjects', subjectInput, setSubjectInput);
                  }
                }}
                placeholder="Type a subject & press enter (e.g. Physics, History)"
                className="flex-1 px-3 py-1.5 text-sm rounded-md bg-white border border-[#d8d1c5] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
              />
              <button
                type="button"
                onClick={() => addTag('favoriteSubjects', subjectInput, setSubjectInput)}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#284437] text-white hover:bg-[#1e352b]"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.favoriteSubjects.map((sub) => (
                <span
                  key={sub}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-sm bg-[#e7efe9] text-[#1e352b] border border-[#c6dace]"
                >
                  {sub}
                  <button
                    type="button"
                    onClick={() => removeTag('favoriteSubjects', sub)}
                    className="hover:text-red-700 ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Interests & Hobbies */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#546057] mb-1">
              Personal Interests & Hobbies
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag('interests', interestInput, setInterestInput);
                  }
                }}
                placeholder="e.g. Coding, Robotics, Debate, Psychology"
                className="flex-1 px-3 py-1.5 text-sm rounded-md bg-white border border-[#d8d1c5] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
              />
              <button
                type="button"
                onClick={() => addTag('interests', interestInput, setInterestInput)}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#284437] text-white hover:bg-[#1e352b]"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.interests.map((int) => (
                <span
                  key={int}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-sm bg-[#f2ebd9] text-[#714316] border border-[#e2d5b8]"
                >
                  {int}
                  <button
                    type="button"
                    onClick={() => removeTag('interests', int)}
                    className="hover:text-red-700 ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Budget & Financial Situation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#e2dcce]">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#546057] mb-1">
                Education Budget Preference
              </label>
              <select
                value={formData.budgetPreference}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budgetPreference: e.target.value as StudentProfile['budgetPreference'],
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-md bg-white border border-[#d8d1c5] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
              >
                <option value="budget">Budget-Friendly / Govt Colleges (&lt; ₹50,000 / yr)</option>
                <option value="moderate">Moderate (₹50,000 - ₹2,00,000 / yr)</option>
                <option value="flexible">Flexible / Standard Private Colleges</option>
                <option value="premium">Premium Private / Global Studies Abroad</option>
              </select>
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#39423c]">
                <input
                  type="checkbox"
                  checked={formData.financialAssistanceNeeded}
                  onChange={(e) =>
                    setFormData({ ...formData, financialAssistanceNeeded: e.target.checked })
                  }
                  className="rounded text-[#1e352b] focus:ring-[#1e352b] w-4 h-4 accent-[#1e352b]"
                />
                <span>I am seeking government scholarships & financial fee waivers</span>
              </label>
            </div>
          </div>

          {/* Projects and Achievements */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#546057] mb-1">
              Projects, Certifications & Achievements
            </label>
            <textarea
              rows={2}
              value={formData.projectsAndAchievements}
              onChange={(e) => setFormData({ ...formData, projectsAndAchievements: e.target.value })}
              placeholder="e.g. Science exhibition 1st prize, built a personal website, school captain, completed Python course..."
              className="w-full px-3 py-2 text-sm rounded-md bg-white border border-[#d8d1c5] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
            ></textarea>
          </div>

          {/* Footer action */}
          <div className="pt-4 flex items-center justify-between border-t border-[#ded7cc]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-md text-[#546057] hover:text-[#1e352b]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={savedSuccess}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-[#1e352b] text-white hover:bg-[#2a493c] transition-colors shadow-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Profile Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#e8a36e]" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
