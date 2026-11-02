'use client';

import React, { useState } from 'react';
import { COURSE_COMPARISONS_DATA } from '@/lib/data';
import { CourseComparison as CourseComparisonType } from '@/lib/types';
import { BookOpen, Sparkles, CheckCircle2, XCircle, ArrowRight, Check, HelpCircle, Columns } from 'lucide-react';

interface CourseComparisonProps {
  onAskAI: (prompt: string) => void;
}

export default function CourseComparison({ onAskAI }: CourseComparisonProps) {
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>(
    COURSE_COMPARISONS_DATA[0].id
  );

  const activeComparison =
    COURSE_COMPARISONS_DATA.find((c) => c.id === selectedComparisonId) ||
    COURSE_COMPARISONS_DATA[0];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#546057]">
          04 · Side-by-Side Analysis
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e352b] tracking-tight">
          Course & Degree Comparison
        </h2>
        <p className="text-sm sm:text-base text-[#465149] leading-relaxed">
          Compare key academic degrees side-by-side on duration, fees, eligibility, admission exams,
          placement trends, and long-term higher study options before taking decisions.
        </p>
      </div>

      {/* Comparison Selector Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
        {COURSE_COMPARISONS_DATA.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedComparisonId(item.id)}
            className={`px-4 py-2.5 rounded-lg border font-medium transition-all ${
              selectedComparisonId === item.id
                ? 'bg-[#1e352b] text-white border-[#1e352b] shadow-xs'
                : 'bg-white text-[#414d45] border-[#ded7cc] hover:bg-[#ede7dc]'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Comparison Container */}
      <div className="bg-white rounded-xl border border-[#ded7cc] shadow-sm overflow-hidden">
        {/* Header of Active Comparison */}
        <div className="bg-[#1e352b] text-[#f2ede4] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-[#c2d6c9] uppercase tracking-wider mb-1">
              {activeComparison.category}
            </div>
            <h3 className="text-2xl font-bold font-serif text-white tracking-tight">
              {activeComparison.name}
            </h3>
          </div>
          <button
            onClick={() =>
              onAskAI(
                `Please compare ${activeComparison.name} in great detail. I want to understand the exact curriculum differences, career trajectory after 5 years, salary comparison, and which one is better suited for my situation.`
              )
            }
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-[#eef4f0] text-[#1e352b] hover:bg-white transition-colors self-start sm:self-auto shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
            <span>Ask AI Mentor for Advice</span>
          </button>
        </div>

        {/* Ideal For Verdict Callout */}
        <div className="p-4 sm:p-6 bg-[#faf6ee] border-b border-[#ebdcc7] text-xs sm:text-sm text-[#3f2f1e]">
          <span className="font-bold text-[#7a4810] uppercase tracking-wider text-[11px] block mb-1">
            PathFinder Guidance Verdict:
          </span>
          <p className="leading-relaxed">{activeComparison.idealFor}</p>
        </div>

        {/* Side-by-Side Detailed Rows */}
        <div className="divide-y divide-[#ece6dc] text-xs sm:text-sm text-[#2d3731]">
          {/* Duration & Focus */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 font-bold text-[#1e352b]">Duration & Core Focus</div>
            <div className="md:col-span-9 space-y-2">
              <div className="font-medium text-[#1e352b]">{activeComparison.duration}</div>
              <p className="text-xs text-[#525f57] leading-relaxed">{activeComparison.focus}</p>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#faf8f5]/60">
            <div className="md:col-span-3 font-bold text-[#1e352b]">Eligibility Criteria</div>
            <div className="md:col-span-9 text-xs text-[#424e47] leading-relaxed">
              {activeComparison.eligibility}
            </div>
          </div>

          {/* Approximate Fees */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 font-bold text-[#1e352b]">Approximate Fees</div>
            <div className="md:col-span-9 font-medium text-[#856126]">
              {activeComparison.approxFees}
            </div>
          </div>

          {/* Admission Process & Exams */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#faf8f5]/60">
            <div className="md:col-span-3 font-bold text-[#1e352b]">Admission & Entrance Exams</div>
            <div className="md:col-span-9 space-y-2">
              <p className="text-xs text-[#48554d]">{activeComparison.admissionProcess}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeComparison.entranceExams.map((exam, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-sm bg-[#eef4f0] text-[#1e352b] border border-[#d2e2d8]"
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Career Opportunities */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 font-bold text-[#1e352b]">Career Opportunities</div>
            <div className="md:col-span-9">
              <div className="flex flex-wrap gap-2">
                {activeComparison.careerOpportunities.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-sm bg-[#faf8f5] border border-[#d8d1c3] text-[#2c3731]"
                  >
                    • {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Higher Studies Pathway */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#faf8f5]/60">
            <div className="md:col-span-3 font-bold text-[#1e352b]">Higher Studies Pathway</div>
            <div className="md:col-span-9 space-y-1.5 text-xs text-[#414d46]">
              {activeComparison.higherStudies.map((hs, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-[#8a6833] mt-0.5">•</span>
                  <span>{hs}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Advantages (Pros) */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 font-bold text-[#1e352b]">Key Advantages</div>
            <div className="md:col-span-9 space-y-2">
              {activeComparison.pros.map((pro, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#2b4436]">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trade-offs & Limitations (Cons) */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#faf8f5]/60">
            <div className="md:col-span-3 font-bold text-[#1e352b]">Trade-offs & Considerations</div>
            <div className="md:col-span-9 space-y-2">
              {activeComparison.cons.map((con, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#523927]">
                  <HelpCircle className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-6 bg-[#faf8f5] border-t border-[#ded7cc] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#59665f]">
          <div>
            Need assistance choosing between these options based on your personal grades and budget?
          </div>
          <button
            onClick={() =>
              onAskAI(`Which is better for me between ${activeComparison.name}? Ask me about my math abilities and career goals to give an honest recommendation.`)
            }
            className="flex items-center gap-1.5 px-4 py-2 font-semibold text-white bg-[#1e352b] hover:bg-[#28473a] rounded-md transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e8a36e]" />
            <span>Consult AI Mentor</span>
          </button>
        </div>
      </div>
    </div>
  );
}
