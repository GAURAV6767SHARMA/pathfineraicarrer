'use client';

import React from 'react';
import { Compass, Sparkles, BookOpen, ArrowRight, CheckCircle2, Search, ArrowUpRight, Award, HelpCircle, Users } from 'lucide-react';
import { StudentProfile } from '@/lib/types';

interface HeroSectionProps {
  onNavigate: (tabId: string) => void;
  onOpenProfile: () => void;
  studentProfile: StudentProfile | null;
}

export default function HeroSection({
  onNavigate,
  onOpenProfile,
  studentProfile,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#e5dfd5]">
      {/* Subtle organic background aura (calm sage and warm ochre, no blue) */}
      <div className="absolute top-0 right-0 -mt-12 -mr-16 w-96 h-96 rounded-full bg-[#e8f1ec]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 rounded-full bg-[#f4ece0]/70 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Profile Status Banner */}
        {studentProfile?.name ? (
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#eef4f0] border border-[#d2e2d8] text-xs text-[#244233]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>
              Welcome back, <strong>{studentProfile.name}</strong> · Profile active ({studentProfile.currentLevel} · {studentProfile.stream || 'General'})
            </span>
            <button
              onClick={onOpenProfile}
              className="ml-2 underline text-[#1e352b] font-medium hover:text-emerald-950"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#f6efe4] border border-[#e2d6c2] text-xs text-[#61451f]">
            <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
            <span>New here? Create your student profile in 1 minute to personalize guidance & AI counseling.</span>
            <button
              onClick={onOpenProfile}
              className="ml-1 font-semibold underline text-[#7a4810] hover:text-[#4d2d09]"
            >
              Create Profile →
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold tracking-wider uppercase text-[#526359] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#b45309]" />
                <span>Education to Career Guidance Platform</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-[#1a2d24] leading-[1.12]">
                Your Future, <br />
                <span className="italic font-normal text-[#2d5040]">Your Choice!</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#404c44] leading-relaxed max-w-2xl font-normal">
              Confused about your education and career choices? We help you explore different courses,
              understand career opportunities, compare options, and find the right pathway according
              to your interests, abilities, and goals.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('guidance')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-md bg-[#1e352b] text-white hover:bg-[#28473a] transition-all shadow-xs"
              >
                <span>Find My Career Path</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('ai-mentor')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-md bg-white border border-[#c9dfd2] text-[#1e352b] hover:bg-[#f1f6f3] transition-all shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#b45309]" />
                <span>Ask Gemini AI Mentor</span>
              </button>

              <button
                onClick={() => onNavigate('pathways')}
                className="px-4 py-3 text-sm font-medium text-[#46534a] hover:text-[#1e352b] transition-colors"
              >
                Explore Pathways →
              </button>
            </div>

            {/* The 3 Core Student Questions */}
            <div className="pt-8 border-t border-[#e2dbcf] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-lg bg-white/70 border border-[#e5dfd5]">
                <div className="text-xs font-bold text-[#1e352b] mb-1">1. Where Am I Now?</div>
                <p className="text-[11px] text-[#55635b] leading-normal">
                  Evaluate your current academic standing, favorite subjects, skills, and budget.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white/70 border border-[#e5dfd5]">
                <div className="text-xs font-bold text-[#1e352b] mb-1">2. Where Can I Go?</div>
                <p className="text-[11px] text-[#55635b] leading-normal">
                  Explore streams, university degrees, polytechnics, exams, and alternative backup options.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white/70 border border-[#e5dfd5]">
                <div className="text-xs font-bold text-[#1e352b] mb-1">3. How Can I Reach There?</div>
                <p className="text-[11px] text-[#55635b] leading-normal">
                  Follow step-by-step milestones, build practical skills, and book verified mentor guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick-Finder & Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-xl border border-[#ded7cb] p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#eee8df]">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1e352b]">
                    Explore By Your Academic Stage
                  </h3>
                  <p className="text-xs text-[#637067]">
                    Instant access to curated choices & eligibility
                  </p>
                </div>
                <span className="text-xs font-mono text-[#8a6833] bg-[#faf3e8] px-2 py-0.5 rounded-xs">
                  Updated 2026
                </span>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => onNavigate('pathways')}
                  className="w-full text-left p-3.5 rounded-lg bg-[#faf8f5] hover:bg-[#f0ebe0] border border-[#e8e2d7] transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-[#1e352b] group-hover:text-[#14261e]">
                      After Class 10th
                    </div>
                    <div className="text-[11px] text-[#59665f] mt-0.5">
                      Science (PCM/PCB) · Commerce · Arts · Polytechnic · ITI · Vocations
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#8a6833] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('pathways')}
                  className="w-full text-left p-3.5 rounded-lg bg-[#faf8f5] hover:bg-[#f0ebe0] border border-[#e8e2d7] transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-[#1e352b] group-hover:text-[#14261e]">
                      After Class 12th
                    </div>
                    <div className="text-[11px] text-[#59665f] mt-0.5">
                      B.Tech · MBBS · BCA · B.Com · CA · BBA · Law BA LLB · Design
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#8a6833] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('pathways')}
                  className="w-full text-left p-3.5 rounded-lg bg-[#faf8f5] hover:bg-[#f0ebe0] border border-[#e8e2d7] transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-[#1e352b] group-hover:text-[#14261e]">
                      After Graduation
                    </div>
                    <div className="text-[11px] text-[#59665f] mt-0.5">
                      Master&apos;s & MBA · UPSC & Bank PO · Corporate Tech · Startups · PhD
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#8a6833] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Fast Jump Matrix */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => onNavigate('compare')}
                  className="p-2.5 rounded-md bg-[#edf4f0] text-[#1c382b] font-medium hover:bg-[#ddebe2] flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#284437]" />
                  <span>Compare Courses</span>
                </button>

                <button
                  onClick={() => onNavigate('alternatives')}
                  className="p-2.5 rounded-md bg-[#fdf2e8] text-[#783e0c] font-medium hover:bg-[#f9e5d4] flex items-center gap-1.5 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#b45309]" />
                  <span>Alternative Backups</span>
                </button>

                <button
                  onClick={() => onNavigate('exams')}
                  className="p-2.5 rounded-md bg-[#f6f2ea] text-[#42392c] font-medium hover:bg-[#eee8dc] flex items-center gap-1.5 transition-colors"
                >
                  <Award className="w-3.5 h-3.5 text-[#856126]" />
                  <span>Exams & Scholarships</span>
                </button>

                <button
                  onClick={() => onNavigate('experts')}
                  className="p-2.5 rounded-md bg-[#eef3ef] text-[#243f31] font-medium hover:bg-[#dfede3] flex items-center gap-1.5 transition-colors"
                >
                  <Users className="w-3.5 h-3.5 text-[#2b4c3b]" />
                  <span>Expert Connect</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
