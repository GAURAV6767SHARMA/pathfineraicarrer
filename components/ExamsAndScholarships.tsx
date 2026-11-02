'use client';

import React, { useState } from 'react';
import { ENTRANCE_EXAMS_DATA, SCHOLARSHIPS_DATA } from '@/lib/data';
import { EntranceExam, ScholarshipInfo } from '@/lib/types';
import { Award, BookOpen, ExternalLink, Search, Sparkles, Calendar, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';

interface ExamsAndScholarshipsProps {
  onAskAI: (prompt: string) => void;
}

export default function ExamsAndScholarships({ onAskAI }: ExamsAndScholarshipsProps) {
  const [activeTab, setActiveTab] = useState<'exams' | 'scholarships'>('exams');
  const [examCategory, setExamCategory] = useState<string>('all');
  const [scholarshipCategory, setScholarshipCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const examCategories = ['all', 'Engineering', 'Medical', 'Central Universities', 'Law', 'Defense'];
  const scholarshipCategories = ['all', 'Government', 'Merit-Based', 'Need-Based', 'Corporate / Foundation'];

  const filteredExams = ENTRANCE_EXAMS_DATA.filter((exam) => {
    if (examCategory !== 'all' && exam.category !== examCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = exam.name.toLowerCase().includes(q);
      const matchFull = exam.fullName.toLowerCase().includes(q);
      const matchPurpose = exam.purpose.toLowerCase().includes(q);
      if (!matchName && !matchFull && !matchPurpose) return false;
    }
    return true;
  });

  const filteredScholarships = SCHOLARSHIPS_DATA.filter((sch) => {
    if (scholarshipCategory !== 'all' && sch.type !== scholarshipCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = sch.name.toLowerCase().includes(q);
      const matchProvider = sch.provider.toLowerCase().includes(q);
      if (!matchName && !matchProvider) return false;
    }
    return true;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#546057]">
          05 · Admissions & Financial Assistance
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e352b] tracking-tight">
          Entrance Exams & Scholarships Hub
        </h2>
        <p className="text-sm sm:text-base text-[#465149] leading-relaxed">
          Critical timelines, eligibility parameters, exam patterns, official websites, and
          government/corporate financial aid schemes to ensure finance is never a barrier to your education.
        </p>
      </div>

      {/* Primary Toggle: Exams vs Scholarships */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-lg bg-[#eee8dc] border border-[#d8d1c3] gap-1 text-xs sm:text-sm">
          <button
            onClick={() => {
              setActiveTab('exams');
              setSearchQuery('');
            }}
            className={`px-5 py-2 font-medium rounded-md transition-all ${
              activeTab === 'exams'
                ? 'bg-[#1e352b] text-white shadow-xs'
                : 'text-[#444f47] hover:text-[#1e352b]'
            }`}
          >
            Major Entrance Examinations
          </button>
          <button
            onClick={() => {
              setActiveTab('scholarships');
              setSearchQuery('');
            }}
            className={`px-5 py-2 font-medium rounded-md transition-all ${
              activeTab === 'scholarships'
                ? 'bg-[#1e352b] text-white shadow-xs'
                : 'text-[#444f47] hover:text-[#1e352b]'
            }`}
          >
            Scholarships & Financial Aid
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#ded7cc] shadow-xs">
        {activeTab === 'exams' ? (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[#5b6860] font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Domain:
            </span>
            {examCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setExamCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  examCategory === cat
                    ? 'bg-[#284437] text-white'
                    : 'bg-[#faf8f5] text-[#48534b] hover:bg-[#ede7dc] border border-[#e2dbce]'
                }`}
              >
                {cat === 'all' ? 'All Exams' : cat}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[#5b6860] font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Scheme Type:
            </span>
            {scholarshipCategories.map((sc) => (
              <button
                key={sc}
                onClick={() => setScholarshipCategory(sc)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  scholarshipCategory === sc
                    ? 'bg-[#284437] text-white'
                    : 'bg-[#faf8f5] text-[#48534b] hover:bg-[#ede7dc] border border-[#e2dbce]'
                }`}
              >
                {sc === 'all' ? 'All Scholarships' : sc}
              </button>
            ))}
          </div>
        )}

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#75847b] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'exams' ? 'Search JEE, NEET, CUET...' : 'Search scholarships...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md bg-[#faf8f5] border border-[#d8d1c3] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
          />
        </div>
      </div>

      {/* ENTRANCE EXAMS TAB CONTENT */}
      {activeTab === 'exams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-xl border border-[#ded7cc] p-6 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Unboxed Metadata */}
                <div className="flex items-center justify-between text-xs text-[#5d6a62]">
                  <span className="font-semibold text-[#1e352b]">{exam.category}</span>
                  <div className="flex items-center gap-1 text-[#856126] font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exam.applicationPeriod.split('·')[0]}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-serif text-[#1e352b]">{exam.name}</h3>
                  <div className="text-xs text-[#59655d] mt-0.5">{exam.fullName}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#faf8f5] border border-[#e8e2d7] space-y-1.5 text-xs">
                  <div>
                    <span className="font-bold text-[#1e352b]">Purpose: </span>
                    <span className="text-[#3c4640]">{exam.purpose}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#1e352b]">Eligibility: </span>
                    <span className="text-[#3c4640]">{exam.eligibility}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#1e352b]">Pattern: </span>
                    <span className="text-[#3c4640]">{exam.examPattern}</span>
                  </div>
                </div>

                {/* Preparation Tips */}
                <div>
                  <span className="text-[11px] font-bold text-[#57645c] uppercase tracking-wider block mb-1">
                    Key Preparation Tips:
                  </span>
                  <ul className="space-y-1 text-xs text-[#3b453f]">
                    {exam.keyTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#8a6833] mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#eee8df] flex items-center justify-between gap-2">
                <button
                  onClick={() =>
                    onAskAI(
                      `Give me a complete preparation strategy and month-by-month study timetable for ${exam.name} (${exam.fullName}). What are the highest scoring chapters and recommended free resources?`
                    )
                  }
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#1e352b] hover:text-[#28473a]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
                  <span>Get AI Prep Strategy</span>
                </button>

                <a
                  href={exam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#7a4810] hover:text-[#4d2d09] underline"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SCHOLARSHIPS TAB CONTENT */}
      {activeTab === 'scholarships' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((sch) => (
            <div
              key={sch.id}
              className="bg-white rounded-xl border border-[#ded7cc] p-6 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5d6a62]">
                  <span className="font-semibold text-[#1e352b]">{sch.type}</span>
                  <span className="text-[#856126] font-medium">{sch.applicationDeadline.split('(')[0]}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-serif text-[#1e352b]">{sch.name}</h3>
                  <div className="text-xs text-[#5b6760] mt-0.5 font-medium">{sch.provider}</div>
                </div>

                <div className="p-3 rounded-lg bg-[#eef4f0] border border-[#d2e2d8] text-xs text-[#1e352b]">
                  <span className="font-bold block text-[11px] uppercase tracking-wider mb-0.5">
                    Award Amount / Benefits:
                  </span>
                  <span>{sch.awardDetails}</span>
                </div>

                <div className="text-xs space-y-1.5 text-[#3a443e]">
                  <div>
                    <span className="font-bold text-[#1e352b]">Eligibility: </span>
                    <span className="text-[#4a554e]">{sch.eligibility}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#1e352b]">How to Apply: </span>
                    <span className="text-[#4a554e]">{sch.howToApply}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#eee8df] flex items-center justify-between gap-2">
                <button
                  onClick={() =>
                    onAskAI(
                      `How do I apply for ${sch.name}? What exact documents, income certificates, and portals are required, and what common mistakes should I avoid?`
                    )
                  }
                  className="flex items-center gap-1 text-xs font-semibold text-[#1e352b] hover:text-[#28473a]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
                  <span>Check Eligibility</span>
                </button>

                {sch.officialUrl && (
                  <a
                    href={sch.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#7a4810] hover:text-[#4d2d09] underline"
                  >
                    <span>Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
