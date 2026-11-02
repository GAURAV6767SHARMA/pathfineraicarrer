'use client';

import React, { useState } from 'react';
import { FREQUENTLY_ASKED_QUESTIONS } from '@/lib/data';
import { HelpCircle, MessageSquare, AlertTriangle, Send, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface FaqAndFeedbackProps {
  onAskAI: (prompt: string) => void;
}

export default function FaqAndFeedback({ onAskAI }: FaqAndFeedbackProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [feedbackCategory, setFeedbackCategory] = useState<'general' | 'bug' | 'suggestion' | 'incorrect-data'>('general');
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportText, setReportText] = useState('');

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackText('');
      setFeedbackEmail('');
    }, 2500);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setShowReportModal(false);
      setReportText('');
    }, 1800);
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center space-y-3">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#546057]">
          10 · Help, Answers & Community
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e352b] tracking-tight">
          Frequently Asked Questions & Feedback
        </h2>
        <p className="text-sm sm:text-base text-[#465149] max-w-2xl mx-auto leading-relaxed">
          Clear answers to common student dilemmas. Have a question or want to report an update?
          Share your feedback directly to help us improve PathFinder for everyone.
        </p>
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-4 mb-14">
        {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#ded7cc] overflow-hidden shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#856126] uppercase tracking-wider block">
                    {faq.category}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#1e352b]">
                    {faq.question}
                  </h3>
                </div>
                <div className="p-1 rounded-full text-stone-500">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-[#eee8df] space-y-3 text-xs sm:text-sm text-[#3e4a42] leading-relaxed">
                  <p>{faq.answer}</p>
                  <div className="pt-2">
                    <button
                      onClick={() =>
                        onAskAI(`I am exploring this question: "${faq.question}". Can you explain more specifically for my situation?`)
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e352b] hover:text-[#28473a] underline"
                    >
                      <Sparkles className="w-3 h-3 text-[#b45309]" />
                      <span>Ask AI Mentor for further clarification</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback & Report Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Feedback Form */}
        <div className="md:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-[#ded7cc] shadow-sm space-y-5">
          <div>
            <h3 className="text-xl font-bold font-serif text-[#1e352b]">
              Share Your Feedback & Experience
            </h3>
            <p className="text-xs text-[#59665f] mt-1">
              Did PathFinder help you find clarity? What features or course details should we add?
            </p>
          </div>

          {feedbackSubmitted ? (
            <div className="py-8 text-center space-y-2 bg-[#eef4f0] rounded-lg border border-[#d2e2d8]">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
              <h4 className="font-serif font-bold text-base text-[#1e352b]">Thank You!</h4>
              <p className="text-xs text-[#4b574f]">
                Your feedback has been recorded and will help us improve guidance for future students.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
              {/* Rating */}
              <div>
                <label className="block font-semibold text-[#1e352b] mb-1.5 uppercase tracking-wider text-[11px]">
                  How helpful was PathFinder today?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackRating(star)}
                      className={`w-9 h-9 rounded-md border flex items-center justify-center font-bold text-sm transition-all ${
                        feedbackRating >= star
                          ? 'bg-[#1e352b] text-white border-[#1e352b]'
                          : 'bg-[#faf8f5] text-[#55635b] border-[#ded7cc]'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="self-center ml-2 text-[#6e7b73] text-[11px]">
                    {feedbackRating === 5 ? 'Extremely helpful' : `${feedbackRating} of 5 stars`}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold text-[#1e352b] mb-1 uppercase tracking-wider text-[11px]">
                  Feedback Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'general', label: 'General Experience' },
                    { id: 'suggestion', label: 'Feature Request' },
                    { id: 'bug', label: 'Report Website Issue' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() =>
                        setFeedbackCategory(cat.id as 'general' | 'suggestion' | 'bug')
                      }
                      className={`px-3 py-1.5 rounded-md border text-xs font-medium ${
                        feedbackCategory === cat.id
                          ? 'bg-[#284437] text-white border-[#284437]'
                          : 'bg-[#faf8f5] text-[#48534b] border-[#ded7cc]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text */}
              <div>
                <label className="block font-semibold text-[#1e352b] mb-1 uppercase tracking-wider text-[11px]">
                  Your Comments or Suggestions *
                </label>
                <textarea
                  required
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or specific courses you want covered..."
                  className="w-full p-3 rounded-md bg-[#faf8f5] border border-[#d8d1c3] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
                />
              </div>

              {/* Optional Email */}
              <div>
                <label className="block font-semibold text-[#1e352b] mb-1 uppercase tracking-wider text-[11px]">
                  Your Email (Optional, if you would like a reply)
                </label>
                <input
                  type="email"
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 rounded-md bg-[#faf8f5] border border-[#d8d1c3] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 font-semibold text-xs rounded-md bg-[#1e352b] text-white hover:bg-[#28473a] shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Feedback</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Quick Help & Report Incorrect Data */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-[#faf8f5] p-6 rounded-xl border border-[#ded7cc] space-y-3">
            <h4 className="font-serif font-bold text-base text-[#1e352b]">
              Have a Direct Question?
            </h4>
            <p className="text-xs text-[#525f57] leading-relaxed">
              Our AI Mentor is available 24/7 to answer specific queries regarding exam cutoffs,
              eligibility parameters, college options, and scholarship deadlines.
            </p>
            <button
              onClick={() => onAskAI(`What is the best way to get started with career planning if I am overwhelmed?`)}
              className="w-full py-2 px-3 text-xs font-semibold rounded-md bg-[#1e352b] text-white hover:bg-[#28473a] text-center"
            >
              Ask AI Mentor Now →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#ded7cc] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#8a6833]">
              <AlertTriangle className="w-4 h-4" />
              <span>Report Incorrect Information</span>
            </div>
            <p className="text-[11px] text-[#637269] leading-relaxed">
              Noticed an outdated exam date or tuition fee range? Let our editorial team know so we can verify and update it immediately.
            </p>
            <button
              onClick={() => setShowReportModal(true)}
              className="text-xs font-medium text-[#7a4810] underline hover:text-[#4d2d09] pt-1 block"
            >
              Submit correction request →
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#faf8f5] w-full max-w-md rounded-xl border border-[#ded7cc] shadow-2xl p-6 space-y-4 text-[#24211d]">
            <div className="flex items-start justify-between border-b border-[#e2dbcf] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#1e352b]">
                Report Incorrect Information
              </h3>
              <button onClick={() => setShowReportModal(false)} className="p-1 text-stone-500">
                ✕
              </button>
            </div>

            {reportSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <p className="text-xs text-[#39453e]">
                  Thank you! Our research team will review and update this entry promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#1e352b] mb-1">
                    Describe the incorrect detail & correct source:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    placeholder="e.g. JEE Main application dates have been extended to Dec 15th on the official portal..."
                    className="w-full p-2.5 rounded-md bg-white border border-[#d8d1c3]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold rounded-md bg-[#1e352b] text-white"
                  >
                    Send Correction
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
