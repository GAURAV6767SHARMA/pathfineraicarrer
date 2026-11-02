'use client';

import React, { useState } from 'react';
import { EXPERT_PROFILES_DATA } from '@/lib/data';
import { ExpertProfile, StudentProfile } from '@/lib/types';
import { Users, Calendar, Clock, DollarSign, CheckCircle2, ShieldCheck, Video, Sparkles, MessageSquare, Briefcase, Award, X, Check } from 'lucide-react';

interface ExpertConnectProps {
  studentProfile: StudentProfile | null;
  onOpenProfile: () => void;
}

export default function ExpertConnect({ studentProfile, onOpenProfile }: ExpertConnectProps) {
  const [selectedExpert, setSelectedExpert] = useState<ExpertProfile | null>(null);
  const [sessionDuration, setSessionDuration] = useState<'30' | '60'>('30');
  const [selectedDate, setSelectedDate] = useState('2026-11-05');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('06:00 PM');
  const [shareProfile, setShareProfile] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [mentorSubmitted, setMentorSubmitted] = useState(false);

  // Mentor form state
  const [mentorForm, setMentorForm] = useState({
    name: '',
    role: '',
    company: '',
    experience: '5',
    expertise: '',
    linkedin: '',
  });

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedExpert(null);
    }, 2200);
  };

  const handleMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMentorSubmitted(true);
    setTimeout(() => {
      setMentorSubmitted(false);
      setShowMentorModal(false);
      setMentorForm({ name: '', role: '', company: '', experience: '5', expertise: '', linkedin: '' });
    }, 1800);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#546057]">
          09 · Direct Industry Mentorship
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e352b] tracking-tight">
          Expert Connect: Walk With Experienced Mentors
        </h2>
        <p className="text-sm sm:text-base text-[#465149] leading-relaxed">
          Learn from people who have already walked your path. Bridge the gap between classroom theory
          and real-world corporate expectations with 1-on-1 personalized counseling sessions.
        </p>
      </div>

      {/* How Does Expert Connect Work (5 Steps) */}
      <div className="mb-14 bg-white rounded-xl border border-[#ded7cc] p-6 sm:p-8 shadow-xs">
        <div className="text-xs font-bold text-[#1e352b] uppercase tracking-wider mb-6 text-center">
          How Does Expert Connect Work?
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
          {[
            {
              step: '1',
              title: 'Explore Experts',
              desc: 'Browse professionals by career field, industry experience, and expertise.',
            },
            {
              step: '2',
              title: 'Select Your Expert',
              desc: 'Choose a mentor whose journey matches your target dreams and dilemmas.',
            },
            {
              step: '3',
              title: 'Share Profile',
              desc: 'Your academic background, skills, and budget are voluntarily briefed.',
            },
            {
              step: '4',
              title: 'Book Consultation',
              desc: 'Select a convenient 30 or 60 minute slot with transparent pricing.',
            },
            {
              step: '5',
              title: 'Get Guidance',
              desc: 'Receive tailored career advice, resume tips, and actionable roadmaps.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-lg bg-[#faf8f5] border border-[#e5dfd5] text-center space-y-2 relative"
            >
              <div className="w-7 h-7 rounded-full bg-[#1e352b] text-white flex items-center justify-center font-bold text-xs mx-auto">
                {item.step}
              </div>
              <h4 className="font-bold text-[#1e352b]">{item.title}</h4>
              <p className="text-[#55635b] text-[11px] leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Profiles Grid */}
      <div className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl font-bold font-serif text-[#1e352b]">
              Featured Industry Mentors
            </h3>
            <p className="text-xs text-[#5a685f]">
              Fictional illustrative profiles demonstrating consultation interface
            </p>
          </div>
          <button
            onClick={() => setShowMentorModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-[#faf8f5] text-[#1e352b] hover:bg-[#ede7dc] border border-[#ded7cc] self-start sm:self-auto"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#b45309]" />
            <span>Become a Mentor</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERT_PROFILES_DATA.map((expert) => (
            <div
              key={expert.id}
              className="bg-white rounded-xl border border-[#ded7cc] p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-full bg-[#eef4f0] text-[#1e352b] flex items-center justify-center font-bold text-base border border-[#d2e2d8]">
                    {expert.name.charAt(0)}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#856126]">
                      ₹{expert.consultationFee}
                    </span>
                    <span className="text-[10px] text-[#6e7b73] block">/ 30 min</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold font-serif text-base text-[#1e352b]">{expert.name}</h4>
                  <div className="text-xs text-[#4c5850] font-medium">{expert.role}</div>
                  <div className="text-[11px] text-[#6f7c74]">{expert.company}</div>
                </div>

                {/* Experience & Availability unboxed metadata */}
                <div className="text-[11px] text-[#55635b] flex items-center gap-2">
                  <span>{expert.experienceYears} Years Exp</span>
                  <span>·</span>
                  <span>{expert.availability}</span>
                </div>

                <p className="text-xs text-[#48534c] leading-relaxed line-clamp-3">{expert.bio}</p>

                {/* Expertise */}
                <div>
                  <span className="text-[11px] font-bold text-[#55635b] uppercase tracking-wider block mb-1">
                    Areas of Expertise:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {expert.expertise.slice(0, 3).map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[11px] rounded-xs bg-[#faf8f5] border border-[#ded7cc] text-[#2c3731]"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-[#eee8df]">
                <button
                  type="button"
                  onClick={() => setSelectedExpert(expert)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md bg-[#1e352b] text-white hover:bg-[#28473a] transition-colors shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#e8a36e]" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What Students Receive Section */}
      <div className="bg-[#faf8f5] rounded-xl border border-[#ded7cc] p-6 sm:p-8 space-y-6">
        <h3 className="font-serif font-bold text-xl text-[#1e352b] text-center">
          What Will You Get from a Mentorship Consultation?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#354139]">
          <div className="p-4 rounded-lg bg-white border border-[#ded7cc] space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <h4 className="font-bold text-[#1e352b]">Personalized Strengths Audit</h4>
            <p className="text-[#55635b] leading-relaxed">
              Identify skill gaps and high-leverage learning opportunities based on your actual marks and interests.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-[#ded7cc] space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <h4 className="font-bold text-[#1e352b]">Resume & Project Guidance</h4>
            <p className="text-[#55635b] leading-relaxed">
              Direct review of your project concepts, portfolio, and ATS-friendly resume formatting from someone who hires.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-[#ded7cc] space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <h4 className="font-bold text-[#1e352b]">Alternative Backup Routes</h4>
            <p className="text-[#55635b] leading-relaxed">
              Unbiased practical advice on non-traditional paths if you missed exam cutoffs or face budget constraints.
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#faf8f5] w-full max-w-lg rounded-xl border border-[#ded7cc] shadow-2xl p-6 sm:p-8 space-y-6 text-[#24211d]">
            <div className="flex items-start justify-between border-b border-[#e2dbcf] pb-4">
              <div>
                <div className="text-xs text-[#5e6d63] uppercase tracking-wider mb-0.5">
                  Book Mentorship Consultation
                </div>
                <h3 className="text-xl font-bold font-serif text-[#1e352b]">
                  {selectedExpert.name}
                </h3>
                <div className="text-xs text-[#525f57]">{selectedExpert.role} · {selectedExpert.company}</div>
              </div>
              <button
                onClick={() => setSelectedExpert(null)}
                className="p-1 text-stone-500 hover:text-stone-900"
              >
                ✕
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#1e352b]">
                  Consultation Confirmed!
                </h4>
                <p className="text-xs text-[#4b574f] max-w-sm mx-auto">
                  Your session with {selectedExpert.name} on {selectedDate} at {selectedTimeSlot} has been
                  scheduled. A meeting link has been prepared.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSession} className="space-y-4 text-xs">
                {/* Session Duration */}
                <div>
                  <label className="block font-semibold text-[#1e352b] mb-1.5 uppercase tracking-wider text-[11px]">
                    Select Session Length:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSessionDuration('30')}
                      className={`p-2.5 rounded-md border text-center transition-all ${
                        sessionDuration === '30'
                          ? 'bg-[#1e352b] text-white border-[#1e352b] font-medium'
                          : 'bg-white text-[#3c4740] border-[#ded7cc]'
                      }`}
                    >
                      30 Minutes (₹{selectedExpert.consultationFee})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSessionDuration('60')}
                      className={`p-2.5 rounded-md border text-center transition-all ${
                        sessionDuration === '60'
                          ? 'bg-[#1e352b] text-white border-[#1e352b] font-medium'
                          : 'bg-white text-[#3c4740] border-[#ded7cc]'
                      }`}
                    >
                      60 Minutes (₹{Math.round(selectedExpert.consultationFee * 1.8)})
                    </button>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#1e352b] mb-1 text-[11px] uppercase tracking-wider">
                      Select Date:
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-md bg-white border border-[#d8d1c3] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#1e352b] mb-1 text-[11px] uppercase tracking-wider">
                      Available Slot:
                    </label>
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-md bg-white border border-[#d8d1c3] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
                    >
                      <option value="05:00 PM">05:00 PM - 05:30 PM</option>
                      <option value="06:00 PM">06:00 PM - 06:30 PM</option>
                      <option value="07:30 PM">07:30 PM - 08:00 PM</option>
                      <option value="09:00 PM">09:00 PM - 09:30 PM</option>
                    </select>
                  </div>
                </div>

                {/* Profile Sharing Checkbox */}
                <div className="p-3.5 rounded-lg bg-[#eef4f0] border border-[#d2e2d8] space-y-1">
                  <label className="flex items-start gap-2 cursor-pointer font-medium text-[#244031]">
                    <input
                      type="checkbox"
                      checked={shareProfile}
                      onChange={(e) => setShareProfile(e.target.checked)}
                      className="rounded text-[#1e352b] focus:ring-[#1e352b] w-4 h-4 mt-0.5 accent-[#1e352b]"
                    />
                    <span>Share my PathFinder Student Profile with {selectedExpert.name}</span>
                  </label>
                  <p className="text-[11px] text-[#4d6657] pl-6">
                    Allows the expert to review your academic background, past marks, budget, and target goals before the call.
                  </p>
                  {!studentProfile?.name && shareProfile && (
                    <div className="pt-1 pl-6">
                      <button
                        type="button"
                        onClick={onOpenProfile}
                        className="text-[11px] font-semibold text-[#1e352b] underline"
                      >
                        You haven&apos;t created a profile yet. Create it now →
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-[#e2dbcf] flex items-center justify-between">
                  <span className="font-bold text-[#1e352b] text-sm">
                    Total: ₹{sessionDuration === '30' ? selectedExpert.consultationFee : Math.round(selectedExpert.consultationFee * 1.8)}
                  </span>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 font-semibold text-xs rounded-md bg-[#1e352b] text-white hover:bg-[#28473a] shadow-xs"
                  >
                    <Video className="w-3.5 h-3.5 text-[#e8a36e]" />
                    <span>Confirm & Schedule</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Become a Mentor Modal */}
      {showMentorModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#faf8f5] w-full max-w-lg rounded-xl border border-[#ded7cc] shadow-2xl p-6 sm:p-8 space-y-5 text-[#24211d]">
            <div className="flex items-start justify-between border-b border-[#e2dbcf] pb-3">
              <div>
                <h3 className="text-xl font-bold font-serif text-[#1e352b]">
                  Become a PathFinder Mentor
                </h3>
                <p className="text-xs text-[#525f57] mt-0.5">
                  Share your experience. Guide the next generation.
                </p>
              </div>
              <button onClick={() => setShowMentorModal(false)} className="p-1 text-stone-500">
                ✕
              </button>
            </div>

            {mentorSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="font-bold font-serif text-base text-[#1e352b]">
                  Application Received!
                </h4>
                <p className="text-xs text-[#4c5850]">
                  Thank you for volunteering to mentor students. Our team will verify your profile within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMentorSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-[#1e352b] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={mentorForm.name}
                    onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full px-3 py-2 rounded-md bg-white border border-[#d8d1c3]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#1e352b] mb-1">Current Job Role</label>
                    <input
                      type="text"
                      required
                      value={mentorForm.role}
                      onChange={(e) => setMentorForm({ ...mentorForm, role: e.target.value })}
                      placeholder="e.g. Product Manager"
                      className="w-full px-3 py-2 rounded-md bg-white border border-[#d8d1c3]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#1e352b] mb-1">Company / Organization</label>
                    <input
                      type="text"
                      required
                      value={mentorForm.company}
                      onChange={(e) => setMentorForm({ ...mentorForm, company: e.target.value })}
                      placeholder="e.g. Tech Corp / Startup"
                      className="w-full px-3 py-2 rounded-md bg-white border border-[#d8d1c3]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-[#1e352b] mb-1">Areas of Mentorship</label>
                  <input
                    type="text"
                    required
                    value={mentorForm.expertise}
                    onChange={(e) => setMentorForm({ ...mentorForm, expertise: e.target.value })}
                    placeholder="e.g. Data Science, Resume Audits, UPSC Prep, Coding Interviews"
                    className="w-full px-3 py-2 rounded-md bg-white border border-[#d8d1c3]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1e352b] mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={mentorForm.linkedin}
                    onChange={(e) => setMentorForm({ ...mentorForm, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3 py-2 rounded-md bg-white border border-[#d8d1c3]"
                  />
                </div>

                <div className="pt-3 border-t border-[#e2dbcf] flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 font-semibold text-xs rounded-md bg-[#1e352b] text-white hover:bg-[#28473a]"
                  >
                    Submit Mentor Application
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
