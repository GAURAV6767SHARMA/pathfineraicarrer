'use client';

import React, { useState } from 'react';
import { EDUCATION_PATHWAYS_DATA } from '@/lib/data';
import { EducationOption } from '@/lib/types';
import { BookOpen, Search, ArrowRight, CheckCircle2, Clock, DollarSign, ShieldAlert, Sparkles, Filter } from 'lucide-react';

interface EducationPathwaysProps {
  onAskAI: (context: string) => void;
  onSetGoal: (careerTitle: string) => void;
}

export default function EducationPathways({ onAskAI, onSetGoal }: EducationPathwaysProps) {
  const [activeTab, setActiveTab] = useState<'after-10th' | 'after-12th' | 'after-graduation'>('after-10th');
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<EducationOption | null>(null);

  const filteredData = EDUCATION_PATHWAYS_DATA.filter((item) => {
    if (item.category !== activeTab) return false;
    if (selectedStream !== 'all' && item.stream && item.stream !== selectedStream) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCourses = item.coreSubjectsOrCourses.some((c) => c.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCourses) return false;
    }
    return true;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#546057]">
          01 · Comprehensive Guidance
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e352b] tracking-tight">
          Education Pathways & Academic Routes
        </h2>
        <p className="text-sm sm:text-base text-[#465149] leading-relaxed">
          Navigate clear, structured options after Class 10th, Class 12th, and Graduation.
          Understand eligibility, duration, real future opportunities, and backup pathways before deciding.
        </p>
      </div>

      {/* Primary Category Segmented Control */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-lg bg-[#eee8dc] border border-[#d8d1c3] gap-1 text-xs sm:text-sm">
          <button
            onClick={() => {
              setActiveTab('after-10th');
              setSelectedStream('all');
            }}
            className={`px-4 py-2 font-medium rounded-md transition-all ${
              activeTab === 'after-10th'
                ? 'bg-[#1e352b] text-white shadow-xs'
                : 'text-[#444f47] hover:text-[#1e352b]'
            }`}
          >
            After Class 10th
          </button>
          <button
            onClick={() => {
              setActiveTab('after-12th');
              setSelectedStream('all');
            }}
            className={`px-4 py-2 font-medium rounded-md transition-all ${
              activeTab === 'after-12th'
                ? 'bg-[#1e352b] text-white shadow-xs'
                : 'text-[#444f47] hover:text-[#1e352b]'
            }`}
          >
            After Class 12th
          </button>
          <button
            onClick={() => {
              setActiveTab('after-graduation');
              setSelectedStream('all');
            }}
            className={`px-4 py-2 font-medium rounded-md transition-all ${
              activeTab === 'after-graduation'
                ? 'bg-[#1e352b] text-white shadow-xs'
                : 'text-[#444f47] hover:text-[#1e352b]'
            }`}
          >
            After Graduation
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#ded7cc] shadow-xs">
        {/* Stream Filter Buttons (for 10th and 12th) */}
        {activeTab !== 'after-graduation' ? (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[#59665e] font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Stream:
            </span>
            {['all', 'Science', 'Commerce', 'Arts/Humanities', 'Diploma/Vocational'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStream(st)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedStream === st
                    ? 'bg-[#284437] text-white'
                    : 'bg-[#faf8f5] text-[#48534b] hover:bg-[#ede7dc] border border-[#e2dbce]'
                }`}
              >
                {st === 'all' ? 'All Options' : st}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-xs text-[#526057] font-medium">
            Postgraduate specialization, civil services, tech careers, research and startups.
          </div>
        )}

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#75847b] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search degrees, exams..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md bg-[#faf8f5] border border-[#d8d1c3] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
          />
        </div>
      </div>

      {/* Quick Summary Matrix for 12th */}
      {activeTab === 'after-12th' && selectedStream === 'all' && !searchQuery && (
        <div className="mb-10 overflow-x-auto rounded-xl border border-[#ded7cc] bg-white p-5 shadow-xs">
          <div className="text-xs font-bold text-[#1e352b] mb-3 uppercase tracking-wider">
            At-A-Glance Stream Comparison After Class 12th
          </div>
          <table className="w-full text-left text-xs text-[#39423c] border-collapse">
            <thead>
              <tr className="border-b border-[#e2dbcf] text-[#1e352b] font-semibold bg-[#faf8f5]">
                <th className="py-2.5 px-3">Stream</th>
                <th className="py-2.5 px-3">Popular Degree Options</th>
                <th className="py-2.5 px-3">Typical Duration</th>
                <th className="py-2.5 px-3">Key Entrance Exams</th>
                <th className="py-2.5 px-3">Primary Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece6dc]">
              <tr className="hover:bg-[#faf8f5]">
                <td className="py-2.5 px-3 font-semibold text-[#1e352b]">Science (PCM)</td>
                <td className="py-2.5 px-3">B.Tech / B.E, BCA, B.Sc Computer Science, B.Arch</td>
                <td className="py-2.5 px-3">3 - 4 Years</td>
                <td className="py-2.5 px-3">JEE Main, BITSAT, State CETs</td>
                <td className="py-2.5 px-3">Computing, Infrastructure, Hardware, Problem Solving</td>
              </tr>
              <tr className="hover:bg-[#faf8f5]">
                <td className="py-2.5 px-3 font-semibold text-[#1e352b]">Science (PCB)</td>
                <td className="py-2.5 px-3">MBBS, BDS, B.Pharm, B.Sc Nursing, Physiotherapy</td>
                <td className="py-2.5 px-3">4 - 5.5 Years</td>
                <td className="py-2.5 px-3">NEET-UG</td>
                <td className="py-2.5 px-3">Clinical Care, Diagnostics, Patient Healthcare, Pharma</td>
              </tr>
              <tr className="hover:bg-[#faf8f5]">
                <td className="py-2.5 px-3 font-semibold text-[#1e352b]">Commerce</td>
                <td className="py-2.5 px-3">B.Com, BBA, Chartered Accountancy (CA), CS, CMA</td>
                <td className="py-2.5 px-3">3 - 5 Years</td>
                <td className="py-2.5 px-3">CUET-UG, CA Foundation</td>
                <td className="py-2.5 px-3">Accounting, Auditing, Corporate Finance, Business</td>
              </tr>
              <tr className="hover:bg-[#faf8f5]">
                <td className="py-2.5 px-3 font-semibold text-[#1e352b]">Arts & Humanities</td>
                <td className="py-2.5 px-3">BA, Journalism (BJMC), Psychology, 5-Year Law (BA LLB)</td>
                <td className="py-2.5 px-3">3 - 5 Years</td>
                <td className="py-2.5 px-3">CUET-UG, CLAT</td>
                <td className="py-2.5 px-3">Public Policy, Legal Litigation, Media, Human Behavior</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-[#ded7cc] p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div className="space-y-4">
              {/* Category / Stream Unboxed Metadata */}
              <div className="flex items-center justify-between text-xs text-[#5f6d64]">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#1e352b]">{item.stream || 'General'}</span>
                  <span>·</span>
                  <span>{item.duration}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold font-serif text-[#1e352b] group-hover:text-[#2d5040] transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-[#4c5850] leading-relaxed line-clamp-3">
                {item.description}
              </p>

              {/* Eligibility */}
              <div className="p-3 rounded-lg bg-[#faf8f5] border border-[#e8e2d7] space-y-1 text-xs">
                <span className="font-semibold text-[#1e352b] block text-[11px] uppercase tracking-wider">
                  Eligibility Criteria:
                </span>
                <span className="text-[#3c4740]">{item.eligibility}</span>
              </div>

              {/* Core Opportunities */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#55635b] uppercase tracking-wider block">
                  Future Opportunities:
                </span>
                <ul className="text-xs text-[#353f38] space-y-1">
                  {item.futureOpportunities.slice(0, 3).map((opp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#8a6833] mt-0.5">•</span>
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Alternative Backups */}
              <div className="pt-2 border-t border-[#eee8df] text-xs">
                <span className="font-semibold text-[#7c4d1d] block mb-1">
                  Alternative Backups:
                </span>
                <div className="text-[#59432e] text-[11px]">
                  {item.alternativeBackups.join(' · ')}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="mt-6 pt-4 border-t border-[#eee8df] flex items-center justify-between gap-2">
              <button
                onClick={() =>
                  onAskAI(`Tell me in detail about ${item.title}: admission criteria, top colleges, fees, and career outlook.`)
                }
                className="text-xs font-semibold text-[#284437] hover:text-[#172b22] flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
                <span>Ask AI Mentor</span>
              </button>

              <button
                onClick={() => setSelectedItem(item)}
                className="text-xs font-medium text-[#546057] hover:text-[#1e352b] underline"
              >
                View Full Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#faf8f5] w-full max-w-2xl rounded-xl border border-[#ded7cc] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto text-[#24211d]">
            <div className="flex items-start justify-between border-b border-[#e2dbcf] pb-4">
              <div>
                <div className="text-xs text-[#637268] mb-1">
                  <span>{selectedItem.stream}</span> · <span>{selectedItem.duration}</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#1e352b]">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#38423b]">
              <div>
                <h4 className="font-bold text-[#1e352b] mb-1">Overview</h4>
                <p className="leading-relaxed">{selectedItem.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-white border border-[#ded7cc]">
                <div>
                  <span className="font-bold text-[#1e352b] block mb-1">Eligibility Criteria</span>
                  <p className="text-xs text-[#48534c]">{selectedItem.eligibility}</p>
                </div>
                <div>
                  <span className="font-bold text-[#1e352b] block mb-1">Estimated Cost Range</span>
                  <p className="text-xs text-[#48534c]">{selectedItem.estimatedCostRange}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#1e352b] mb-1.5">Core Disciplines / Subjects</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.coreSubjectsOrCourses.map((c, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs rounded-sm bg-[#eef4f0] text-[#1e352b] border border-[#d3e2d8]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#1e352b] mb-1.5">Future Opportunities & Careers</h4>
                <ul className="space-y-1.5">
                  {selectedItem.futureOpportunities.map((opp, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#284437] mt-0.5 shrink-0" />
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-[#fbf5ed] border border-[#ebdcc9]">
                <h4 className="font-bold text-[#7a4918] mb-1">Alternative Backup Options</h4>
                <p className="text-xs text-[#634524] mb-2">
                  If admission cutoffs or budget constraints arise, consider these viable parallel paths:
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-[#523719]">
                  {selectedItem.alternativeBackups.map((alt, i) => (
                    <span key={i} className="font-medium">• {alt}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e2dbcf] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  onAskAI(`I want to explore ${selectedItem.title}. What are the exact steps, top colleges, and entrance exams I should prepare for?`);
                  setSelectedItem(null);
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-md bg-[#1e352b] text-white hover:bg-[#28473a]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#e8a36e]" />
                <span>Discuss with Gemini AI Mentor</span>
              </button>

              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 text-xs font-medium text-[#5c6860] hover:text-[#1e352b]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
