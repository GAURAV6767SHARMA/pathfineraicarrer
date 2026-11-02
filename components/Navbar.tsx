'use client';

import React, { useState } from 'react';
import { Compass, User, Sparkles, Menu, X, BookOpen, Briefcase, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '@/lib/types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  studentProfile: StudentProfile | null;
  onOpenProfile: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  studentProfile,
  onOpenProfile,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'pathways', label: 'Education Pathways' },
    { id: 'careers', label: 'Career Explorer' },
    { id: 'guidance', label: 'Find Your Path' },
    { id: 'compare', label: 'Compare Courses' },
    { id: 'exams', label: 'Exams & Scholarships' },
    { id: 'skills', label: 'Skills Hub' },
    { id: 'alternatives', label: 'Alternative Routes' },
    { id: 'roadmap', label: 'Goal Planner' },
    { id: 'experts', label: 'Expert Connect' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e5dfd5]">
      {/* Top calm notification bar */}
      <div className="bg-[#1e352b] text-[#e8f0eb] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e8a36e]"></span>
            <span>PathFinder · Dedicated Education & Career Counseling Platform</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#c0d4c7]">
            <span>Where Am I Now?</span>
            <span>·</span>
            <span>Where Can I Go?</span>
            <span>·</span>
            <span>How Can I Reach There?</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#284437] flex items-center justify-center text-[#f2ede4] shadow-xs group-hover:bg-[#1e352b] transition-colors">
              <Compass className="w-5 h-5 text-[#e8a36e]" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-[#1e352b] font-serif">
                PathFinder
              </div>
              <div className="text-[10px] text-[#5c6860] uppercase tracking-wider -mt-1 font-medium">
                Education & Career Guide
              </div>
            </div>
          </div>

          {/* Desktop Links (Primary) */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 text-xs font-medium transition-colors ${
                  activeTab === link.id
                    ? 'text-[#1e352b] font-semibold border-b-2 border-[#284437]'
                    : 'text-[#4e5852] hover:text-[#1e352b] hover:bg-[#ede7dc]/60 rounded-sm'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action buttons (AI Mentor + Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Mentor Button */}
            <button
              onClick={() => handleNavClick('ai-mentor')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                activeTab === 'ai-mentor'
                  ? 'bg-[#284437] text-white shadow-xs'
                  : 'bg-[#e7efe9] text-[#1e352b] hover:bg-[#d9e6dd] border border-[#c4d7cc]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
              <span className="hidden sm:inline">Gemini</span> AI Mentor
            </button>

            {/* Profile Button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md bg-white border border-[#d8d1c5] text-[#2c332e] hover:bg-[#f6f2eb] transition-all shadow-xs"
              title="Manage Student Profile"
            >
              <div className="w-5 h-5 rounded-full bg-[#f0e9df] text-[#284437] flex items-center justify-center font-bold text-[10px]">
                {studentProfile?.name ? studentProfile.name.charAt(0).toUpperCase() : <User className="w-3 h-3" />}
              </div>
              <span className="hidden md:inline font-medium">
                {studentProfile?.name ? studentProfile.name.split(' ')[0] : 'My Profile'}
              </span>
              {studentProfile?.name && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 hidden md:block"></span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-[#2c332e] hover:bg-[#ece6dc]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#faf8f5] border-b border-[#ded7cc] px-4 pt-2 pb-6 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="py-2 px-3 mb-2 bg-[#f2ede4] rounded-md text-xs text-[#4b544e]">
            {studentProfile?.name ? (
              <div className="flex items-center justify-between">
                <span>Profile: <strong>{studentProfile.name}</strong> ({studentProfile.currentLevel})</span>
                <button onClick={onOpenProfile} className="text-[#1e352b] font-semibold underline text-xs">Edit</button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span>No profile saved yet</span>
                <button onClick={onOpenProfile} className="text-[#1e352b] font-semibold underline text-xs">Create Profile</button>
              </div>
            )}
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 text-sm rounded-md font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-[#284437] text-white'
                  : 'text-[#37403a] hover:bg-[#ede7dc]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('ai-mentor')}
            className={`w-full text-left flex items-center justify-between px-3 py-2.5 text-sm rounded-md font-medium ${
              activeTab === 'ai-mentor'
                ? 'bg-[#284437] text-white'
                : 'bg-[#e7efe9] text-[#1e352b]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#b45309]" />
              <span>Gemini AI Career Mentor</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
