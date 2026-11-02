'use client';

import React from 'react';
import { Compass, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenProfile: () => void;
}

export default function Footer({ onNavigate, onOpenProfile }: FooterProps) {
  const problemsAndSolutions = [
    { problem: 'Lack of a clear career roadmap', solution: 'Personalized Career Roadmap & Goal Tracker' },
    { problem: 'Information scattered across different platforms', solution: 'All-in-One Education Hub' },
    { problem: 'Difficulty choosing the right course', solution: 'Course and Career Explorer with Comparisons' },
    { problem: 'Financial confusion and high tuition costs', solution: 'Fees, Govt Schemes and Scholarship Hub' },
    { problem: 'Lack of practical skill guidance', solution: 'Skills and Internship Hub with Real Projects' },
    { problem: 'Lack of backup options if exams miss cutoffs', solution: 'Alternative Career Pathways & Lateral Entry' },
    { problem: 'Difficulty planning and tracking future tasks', solution: 'Milestone Goal Planner with AI Breakdown' },
  ];

  return (
    <footer className="bg-[#182b22] text-[#f2ede4] border-t border-[#294235] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Research to Solution Table Banner */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#20362b] border border-[#2d4d3e] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2d4d3e] pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#e8a36e]">
                User Research · Evidence-Based Design
              </span>
              <h3 className="text-lg font-bold font-serif text-white">
                Connecting Student Research with PathFinder Solutions
              </h3>
            </div>
            <span className="text-xs text-[#b8cbbe]">
              Addressing real barriers identified in student interviews
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#d6e5db] border-collapse">
              <thead>
                <tr className="border-b border-[#2d4d3e] text-[#e8f1ec] font-semibold">
                  <th className="py-2 pr-4 font-bold">Problems Identified by Students</th>
                  <th className="py-2 pl-4 font-bold text-[#e8a36e]">Proposed PathFinder Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#274033]">
                {problemsAndSolutions.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#274033]/50">
                    <td className="py-2 pr-4 text-[#bfd0c5]">{row.problem}</td>
                    <td className="py-2 pl-4 text-white font-medium">{row.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-[#b8cbbe]">
          {/* Brand info */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#284437] flex items-center justify-center text-[#e8a36e]">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold font-serif text-white tracking-tight">
                PathFinder
              </span>
            </div>
            <p className="text-xs text-[#aabcb0] leading-relaxed max-w-sm">
              Your Education. Your Career. Your Path. Helping students understand where they are,
              explore where they can go, and build the step-by-step roadmap to get there.
            </p>
            <div className="pt-2 text-[11px] text-[#8ea496]">
              All-in-One Education to Career Guidance Platform
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Guidance Hubs
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('pathways')} className="hover:text-white transition-colors">
                  Education Pathways (10th, 12th, Grad)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-white transition-colors">
                  Career Explorer (Tech, Medical, Govt, Law)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guidance')} className="hover:text-white transition-colors">
                  Find Your Path (Holland / RIASEC Assessment)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-white transition-colors">
                  Course & College Comparison
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('exams')} className="hover:text-white transition-colors">
                  Entrance Exams & Scholarships
                </button>
              </li>
            </ul>
          </div>

          {/* Skills & Action */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Execution & Mentorship
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('skills')} className="hover:text-white transition-colors">
                  Skills & Internship Playbook
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('alternatives')} className="hover:text-white transition-colors">
                  Alternative Pathways & Lateral Entry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('roadmap')} className="hover:text-white transition-colors">
                  Goal Planner & Milestone Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('experts')} className="hover:text-white transition-colors">
                  Expert Connect Mentorship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-mentor')} className="hover:text-white transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#e8a36e]" />
                  <span>Gemini AI Career Mentor</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Student Profile & Legal */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Student Center
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={onOpenProfile} className="hover:text-white transition-colors underline">
                  My Student Profile
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  FAQs & Help Center
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Share Feedback
                </button>
              </li>
              <li>
                <span className="text-[#849b8d] text-[11px] block pt-2">
                  Information Sources: UGC, NTA, AICTE, NSP & Official Portals
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-8 border-t border-[#294235] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8ea496]">
          <div>
            © {new Date().getFullYear()} PathFinder Education Guidance. Your Future, Your Choice.
          </div>
          <div className="flex items-center gap-3">
            <span>Calm & Focused Academic Environment</span>
            <span>·</span>
            <span>Zero Commercial Biases</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
