'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EducationPathways from '@/components/EducationPathways';
import CareerExplorer from '@/components/CareerExplorer';
import PersonalizedGuidance from '@/components/PersonalizedGuidance';
import CourseComparison from '@/components/CourseComparison';
import ExamsAndScholarships from '@/components/ExamsAndScholarships';
import SkillsAndInternships from '@/components/SkillsAndInternships';
import AlternativePathways from '@/components/AlternativePathways';
import GoalPlanner from '@/components/GoalPlanner';
import ExpertConnect from '@/components/ExpertConnect';
import GeminiMentorChat from '@/components/GeminiMentorChat';
import FaqAndFeedback from '@/components/FaqAndFeedback';
import Footer from '@/components/Footer';
import ProfileModal from '@/components/ProfileModal';
import { StudentProfile } from '@/lib/types';
import {
  Compass,
  Sparkles,
  BookOpen,
  Briefcase,
  GraduationCap,
  Target,
  Award,
  Users,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Columns,
  School,
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pathfinder_student_profile');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return null;
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');
  const [targetGoalPreset, setTargetGoalPreset] = useState<string>('');

  const handleSaveProfile = (profile: StudentProfile) => {
    setStudentProfile(profile);
    try {
      localStorage.setItem('pathfinder_student_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  };

  const handleAskAIWithPrompt = (prompt: string) => {
    setAiInitialPrompt(prompt);
    setActiveTab('ai-mentor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetGoal = (careerTitle: string) => {
    setTargetGoalPreset(careerTitle);
    setActiveTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#24211d]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        studentProfile={studentProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* HOME VIEW: Full Guided Experience */}
        {activeTab === 'home' && (
          <div>
            {/* 1. Hero Section */}
            <HeroSection
              onNavigate={handleNavigate}
              onOpenProfile={() => setIsProfileModalOpen(true)}
              studentProfile={studentProfile}
            />

            {/* Quick Feature Ribbon: What PathFinder Solves */}
            <section className="bg-white py-12 border-b border-[#e5dfd5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#546057]">
                    All-in-One Guidance Architecture
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1e352b]">
                    Everything You Need Under One Roof
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4c5850]">
                    Eliminating scattered advice, hidden entrance deadlines, and high-pressure career confusion.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Pathways */}
                  <div className="p-6 rounded-xl bg-[#faf8f5] border border-[#ded7cc] hover:shadow-sm transition-shadow space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#eef4f0] flex items-center justify-center text-[#1e352b] border border-[#cfded4]">
                      <School className="w-5 h-5 text-[#284437]" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#1e352b]">
                      Education Pathways
                    </h3>
                    <p className="text-xs text-[#4c5850] leading-relaxed">
                      Detailed breakdowns for Science (PCM/PCB), Commerce, Arts, Polytechnic Diplomas,
                      ITI, and Bachelor degrees with eligibility and backup routes.
                    </p>
                    <button
                      onClick={() => handleNavigate('pathways')}
                      className="text-xs font-semibold text-[#1e352b] hover:text-[#28473a] flex items-center gap-1 pt-1"
                    >
                      <span>Explore Academic Streams</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card 2: Holland / RIASEC Assessment */}
                  <div className="p-6 rounded-xl bg-[#faf8f5] border border-[#ded7cc] hover:shadow-sm transition-shadow space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#fbf5ed] flex items-center justify-center text-[#856126] border border-[#eedcc8]">
                      <Target className="w-5 h-5 text-[#856126]" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#1e352b]">
                      Personalized Guidance
                    </h3>
                    <p className="text-xs text-[#4c5850] leading-relaxed">
                      Evaluate your exact education level, favorite subjects, work preferences, and
                      budget to receive tailored career suggestions.
                    </p>
                    <button
                      onClick={() => handleNavigate('guidance')}
                      className="text-xs font-semibold text-[#1e352b] hover:text-[#28473a] flex items-center gap-1 pt-1"
                    >
                      <span>Start 6-Question Assessment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card 3: AI & Mentorship */}
                  <div className="p-6 rounded-xl bg-[#faf8f5] border border-[#ded7cc] hover:shadow-sm transition-shadow space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#eef4f0] flex items-center justify-center text-[#1e352b] border border-[#cfded4]">
                      <Sparkles className="w-5 h-5 text-[#b45309]" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#1e352b]">
                      Gemini AI + Expert Connect
                    </h3>
                    <p className="text-xs text-[#4c5850] leading-relaxed">
                      Consult with our Gemini 3.8 Flash AI Mentor 24/7 or schedule 1-on-1 consultations
                      with experienced engineers, data scientists, and HR leaders.
                    </p>
                    <button
                      onClick={() => handleNavigate('ai-mentor')}
                      className="text-xs font-semibold text-[#1e352b] hover:text-[#28473a] flex items-center gap-1 pt-1"
                    >
                      <span>Talk with Gemini Mentor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Education Pathways Section on Home */}
            <section className="py-16 border-b border-[#e5dfd5]">
              <EducationPathways
                onAskAI={handleAskAIWithPrompt}
                onSetGoal={handleSetGoal}
              />
            </section>

            {/* Quick Course Comparison Section on Home */}
            <section className="bg-white py-16 border-b border-[#e5dfd5]">
              <CourseComparison onAskAI={handleAskAIWithPrompt} />
            </section>

            {/* Career Explorer Section on Home */}
            <section className="py-16 border-b border-[#e5dfd5]">
              <CareerExplorer
                onAskAI={handleAskAIWithPrompt}
                onSetGoal={handleSetGoal}
              />
            </section>

            {/* Alternative Pathways Highlights */}
            <section className="bg-white py-16 border-b border-[#e5dfd5]">
              <AlternativePathways onAskAI={handleAskAIWithPrompt} />
            </section>

            {/* Expert Connect on Home */}
            <section className="py-16 border-b border-[#e5dfd5]">
              <ExpertConnect
                studentProfile={studentProfile}
                onOpenProfile={() => setIsProfileModalOpen(true)}
              />
            </section>

            {/* FAQs on Home */}
            <section className="bg-white py-16 border-b border-[#e5dfd5]">
              <FaqAndFeedback onAskAI={handleAskAIWithPrompt} />
            </section>
          </div>
        )}

        {/* DEDICATED TAB VIEWS */}
        {activeTab === 'pathways' && (
          <EducationPathways
            onAskAI={handleAskAIWithPrompt}
            onSetGoal={handleSetGoal}
          />
        )}

        {activeTab === 'careers' && (
          <CareerExplorer
            onAskAI={handleAskAIWithPrompt}
            onSetGoal={handleSetGoal}
          />
        )}

        {activeTab === 'guidance' && (
          <PersonalizedGuidance
            studentProfile={studentProfile}
            onAskAI={handleAskAIWithPrompt}
            onSetGoal={handleSetGoal}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'compare' && (
          <CourseComparison onAskAI={handleAskAIWithPrompt} />
        )}

        {activeTab === 'exams' && (
          <ExamsAndScholarships onAskAI={handleAskAIWithPrompt} />
        )}

        {activeTab === 'skills' && (
          <SkillsAndInternships onAskAI={handleAskAIWithPrompt} />
        )}

        {activeTab === 'alternatives' && (
          <AlternativePathways onAskAI={handleAskAIWithPrompt} />
        )}

        {activeTab === 'roadmap' && (
          <GoalPlanner
            studentProfile={studentProfile}
            onAskAI={handleAskAIWithPrompt}
            presetTargetCareer={targetGoalPreset}
          />
        )}

        {activeTab === 'experts' && (
          <ExpertConnect
            studentProfile={studentProfile}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'ai-mentor' && (
          <GeminiMentorChat
            studentProfile={studentProfile}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            initialPrompt={aiInitialPrompt}
          />
        )}

        {activeTab === 'faq' && (
          <FaqAndFeedback onAskAI={handleAskAIWithPrompt} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Student Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={studentProfile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
