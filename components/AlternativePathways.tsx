'use client';

import React, { useState } from 'react';
import { ALTERNATIVE_PATHWAYS_DATA } from '@/lib/data';
import { HelpCircle, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Compass, School, DollarSign, BookOpen } from 'lucide-react';

interface AlternativePathwaysProps {
  onAskAI: (prompt: string) => void;
}

export default function AlternativePathways({ onAskAI }: AlternativePathwaysProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center space-y-3">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#546057]">
          07 · Backup & Resilient Strategies
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e352b] tracking-tight">
          Alternative Pathways & Backup Routes
        </h2>
        <p className="text-sm sm:text-base text-[#465149] max-w-2xl mx-auto leading-relaxed">
          There is never only one single door to a successful career. When entrance exam cutoffs,
          dream college rejections, or financial barriers happen, these proven parallel routes lead to the same destination.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4 mb-12">
        {ALTERNATIVE_PATHWAYS_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#ded7cc] overflow-hidden shadow-xs transition-all"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-[#faf8f5] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#eef4f0] text-[#1e352b] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#1e352b]">
                    {item.question}
                  </h3>
                </div>
                <span className="text-[#856126] font-bold text-lg shrink-0">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-[#eee8df] space-y-4 text-xs sm:text-sm text-[#38423b]">
                  <p className="leading-relaxed bg-[#faf8f5] p-4 rounded-lg border border-[#e8e2d7]">
                    {item.solution}
                  </p>

                  <div>
                    <span className="font-bold text-[#1e352b] block mb-2 text-xs uppercase tracking-wider">
                      Recommended Practical Action Steps:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#354139]">
                      {item.actionSteps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#284437] mt-0.5 shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() =>
                        onAskAI(
                          `I have a doubt regarding: "${item.question}". Here is my specific situation (I have limited budget / missed my cutoff). What are my top 3 realistic next steps?`
                        )
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e352b] hover:text-[#28473a] underline"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
                      <span>Ask AI Mentor about my exact situation</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Highlight Box: The Lateral Entry (LEET) & Online Degree Revolution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-[#eef4f0] border border-[#d2e2d8] space-y-3">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-[#1e352b]" />
            <h4 className="font-serif font-bold text-base text-[#1e352b]">
              Polytechnic Lateral Entry (LEET)
            </h4>
          </div>
          <p className="text-xs text-[#39453d] leading-relaxed">
            Did you know? After completing a 3-Year Polytechnic Engineering Diploma (started after Class 10th),
            you can sit for state LEET exams and enter directly into the <strong>2nd year (3rd semester)</strong> of
            B.Tech. You skip high-stress Class 11-12 coaching and graduate with an identical B.Tech engineering degree!
          </p>
          <div className="text-[11px] font-semibold text-[#1e352b] pt-1">
            Total Duration: 3 yrs diploma + 3 yrs B.Tech = 6 years (Same as 10+2+4).
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#faf6ee] border border-[#eddcc7] space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#856126]" />
            <h4 className="font-serif font-bold text-base text-[#7a4810]">
              Premier Online Accredited Degrees
            </h4>
          </div>
          <p className="text-xs text-[#523e2b] leading-relaxed">
            If you cannot afford ₹15 Lakhs for private college, world-class programs like the
            <strong> IIT Madras BS Degree in Data Science & Applications</strong> allow entry without JEE
            and offer up to 75% fee waivers for low-income families. Programs can be pursued from home
            or alongside any local college degree!
          </p>
          <div className="text-[11px] font-semibold text-[#7a4810] pt-1">
            UGC-recognized degrees with legitimate alumni and placement portals.
          </div>
        </div>
      </div>
    </div>
  );
}
