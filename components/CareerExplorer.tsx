'use client';

import React, { useState } from 'react';
import { CAREER_EXPLORER_DATA } from '@/lib/data';
import { CareerOption } from '@/lib/types';
import { Briefcase, Search, Sparkles, Target, ArrowRight, CheckCircle2, TrendingUp, DollarSign, BookOpen } from 'lucide-react';

interface CareerExplorerProps {
  onAskAI: (prompt: string) => void;
  onSetGoal: (careerTitle: string) => void;
}

export default function CareerExplorer({ onAskAI, onSetGoal }: CareerExplorerProps) {
  const [selectedField, setSelectedField] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<CareerOption | null>(null);

  const fields = [
    'all',
    'Technology',
    'Medical & Healthcare',
    'Business & Finance',
    'Government & Public',
    'Creative & Media',
    'Engineering',
  ];

  const filteredCareers = CAREER_EXPLORER_DATA.filter((career) => {
    if (selectedField !== 'all' && career.field !== selectedField) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = career.title.toLowerCase().includes(q);
      const matchDesc = career.description.toLowerCase().includes(q);
      const matchSkills = career.essentialSkills.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchSkills) return false;
    }
    return true;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#546057]">
          02 · Professional Fields
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e352b] tracking-tight">
          Career Explorer & Industry Directory
        </h2>
        <p className="text-sm sm:text-base text-[#465149] leading-relaxed">
          Deep-dive into essential qualifications, required skill stacks, salary expectations,
          and entrance examinations for top careers across modern industries.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#ded7cc] shadow-xs">
        {/* Field buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs w-full md:w-auto">
          {fields.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedField(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedField === f
                  ? 'bg-[#1e352b] text-white shadow-xs'
                  : 'bg-[#faf8f5] text-[#4a554d] hover:bg-[#eee8dd] border border-[#e2dcce]'
              }`}
            >
              {f === 'all' ? 'All Careers' : f}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#75847b] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, skills, keywords..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md bg-[#faf8f5] border border-[#d8d1c3] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
          />
        </div>
      </div>

      {/* Grid of Career Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((career) => (
          <div
            key={career.id}
            className="bg-white rounded-xl border border-[#ded7cc] p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div className="space-y-4">
              {/* Unboxed Metadata */}
              <div className="flex items-center justify-between text-xs text-[#5d6b62]">
                <span className="font-semibold text-[#1e352b]">{career.field}</span>
                <span className="text-[#856126] font-medium">{career.averageStartingSalary}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold font-serif text-[#1e352b] group-hover:text-[#2d5040] transition-colors">
                {career.title}
              </h3>

              {/* Overview */}
              <p className="text-xs text-[#4b574f] leading-relaxed line-clamp-3">
                {career.description}
              </p>

              {/* Qualifications */}
              <div className="p-3 rounded-lg bg-[#faf8f5] border border-[#e8e2d7] text-xs space-y-1">
                <span className="font-semibold text-[#1e352b] block text-[11px] uppercase tracking-wider">
                  Required Qualifications:
                </span>
                <span className="text-[#3c4640] line-clamp-2">{career.requiredQualifications}</span>
              </div>

              {/* Essential Skills */}
              <div>
                <span className="text-[11px] font-bold text-[#56645c] uppercase tracking-wider block mb-1.5">
                  Essential Skills:
                </span>
                <div className="flex flex-wrap gap-1">
                  {career.essentialSkills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] rounded-xs bg-[#eef4f0] text-[#1e352b] border border-[#d4e2d9]"
                    >
                      {skill}
                    </span>
                  ))}
                  {career.essentialSkills.length > 4 && (
                    <span className="text-[10px] text-[#6d7971] self-center ml-1">
                      +{career.essentialSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Key Entrance Exams */}
              <div className="text-xs text-[#505c54]">
                <span className="font-semibold text-[#1e352b]">Key Entrance Exams: </span>
                <span>{career.entranceExams.slice(0, 2).join(', ')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-[#eee8df] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedCareer(career)}
                  className="font-medium text-[#1e352b] underline hover:text-[#28473a]"
                >
                  View Full Career Guide →
                </button>
                <button
                  onClick={() => onSetGoal(career.title)}
                  className="flex items-center gap-1 font-medium text-[#7a4810] hover:text-[#4d2d09]"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Set as Goal</span>
                </button>
              </div>

              <button
                onClick={() =>
                  onAskAI(`What is the step-by-step career path to become a ${career.title}? Include qualifications, best entrance exams, salary milestones, and common pitfalls.`)
                }
                className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md bg-[#edf4f0] text-[#1e352b] hover:bg-[#dbe9df] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
                <span>Ask AI Mentor about this role</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Career Detail Modal */}
      {selectedCareer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#faf8f5] w-full max-w-3xl rounded-xl border border-[#ded7cc] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto text-[#24211d]">
            <div className="flex items-start justify-between border-b border-[#e2dbcf] pb-4">
              <div>
                <div className="text-xs text-[#637268] mb-1">
                  <span>{selectedCareer.field}</span> · <span>Growth: {selectedCareer.growthOutlook}</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#1e352b]">
                  {selectedCareer.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCareer(null)}
                className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-[#38423b]">
              <div>
                <h4 className="font-bold text-[#1e352b] mb-1">What is this career?</h4>
                <p className="leading-relaxed">{selectedCareer.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-white border border-[#ded7cc]">
                <div>
                  <span className="font-bold text-[#1e352b] block mb-1">Required Qualifications</span>
                  <p className="text-xs text-[#48534c] leading-relaxed">
                    {selectedCareer.requiredQualifications}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-[#1e352b] block mb-1">Starting Salary & Growth</span>
                  <p className="text-xs font-semibold text-[#856126]">
                    {selectedCareer.averageStartingSalary}
                  </p>
                  <p className="text-[11px] text-[#55635a] mt-1">{selectedCareer.growthOutlook}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#1e352b] mb-1.5">Essential Skills Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.essentialSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-sm bg-[#eef4f0] text-[#1e352b] border border-[#d3e2d8]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-white border border-[#ded7cc]">
                  <h4 className="font-bold text-[#1e352b] mb-1 text-xs">Relevant Courses & Degrees</h4>
                  <ul className="space-y-1 text-xs text-[#48534c]">
                    {selectedCareer.relevantCourses.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 rounded-lg bg-white border border-[#ded7cc]">
                  <h4 className="font-bold text-[#1e352b] mb-1 text-xs">Entrance Examinations</h4>
                  <ul className="space-y-1 text-xs text-[#48534c]">
                    {selectedCareer.entranceExams.map((e, i) => (
                      <li key={i}>• {e}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#1e352b] mb-1.5">Career Opportunities & Job Roles</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                  {selectedCareer.careerOpportunities.map((opp, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#284437] shrink-0" />
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-[#faf6ee] border border-[#e8ddc9]">
                <h4 className="font-bold text-[#7a4918] mb-1 text-xs">Further Study & Advancement</h4>
                <div className="flex flex-wrap gap-2 text-xs text-[#523719]">
                  {selectedCareer.furtherStudyOptions.map((opt, i) => (
                    <span key={i}>• {opt}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e2dbcf] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSetGoal(selectedCareer.title);
                    setSelectedCareer(null);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-md bg-[#284437] text-white hover:bg-[#1e352b]"
                >
                  <Target className="w-4 h-4 text-[#e8a36e]" />
                  <span>Track in Goal Planner</span>
                </button>

                <button
                  onClick={() => {
                    onAskAI(`I am exploring becoming a ${selectedCareer.title}. Give me an exact month-by-month plan to prepare my skills, resume, and college entrance.`);
                    setSelectedCareer(null);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-md bg-[#edf4f0] text-[#1e352b] hover:bg-[#ddebe2] border border-[#c6dace]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
                  <span>Discuss with Gemini AI</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedCareer(null)}
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
