'use client';

import React, { useState } from 'react';
import { SKILL_ROADMAPS_DATA } from '@/lib/data';
import { BookOpen, Sparkles, CheckCircle2, ArrowRight, ExternalLink, Code2, Users, FileText, Briefcase, Lightbulb, GraduationCap } from 'lucide-react';

interface SkillsAndInternshipsProps {
  onAskAI: (prompt: string) => void;
}

export default function SkillsAndInternships({ onAskAI }: SkillsAndInternshipsProps) {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>(SKILL_ROADMAPS_DATA[0].id);

  const activeRoadmap =
    SKILL_ROADMAPS_DATA.find((r) => r.id === selectedRoadmapId) || SKILL_ROADMAPS_DATA[0];

  const projectIdeas = [
    {
      domain: 'Computer Science & Software',
      title: 'Full-Stack Student Career & Course Tracker',
      tech: 'Next.js, TypeScript, PostgreSQL / SQLite',
      description: 'Allows students to log entrance exams, track milestones, calculate CGPA, and set review reminders.',
    },
    {
      domain: 'Data Science & Analytics',
      title: 'University Placement & Salary Trend Visualizer',
      tech: 'Python, Pandas, Streamlit / Power BI',
      description: 'Cleans government NIRF placement data to reveal true median salaries and branch trends.',
    },
    {
      domain: 'UI / UX Design',
      title: 'Mobile App Redesign for Government Scholarship Portal (NSP)',
      tech: 'Figma, User Journey Mapping, Usability Audits',
      description: 'Simplifies complex bureaucratic eligibility verification into a 3-minute guided mobile flow.',
    },
    {
      domain: 'Business & Finance',
      title: 'Micro-Enterprise Budget & GST Reconciliation Model',
      tech: 'Advanced Excel, Financial Modeling, Scenario Analysis',
      description: 'Automates tax calculations and cash flow projections for local small business owners.',
    },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#546057]">
          06 · Practical Competencies
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e352b] tracking-tight">
          Skills & Internship Hub
        </h2>
        <p className="text-sm sm:text-base text-[#465149] leading-relaxed">
          Develop verified practical skills alongside your academic education. Master programming,
          communication, ATS-friendly resume building, interview readiness, and hands-on projects.
        </p>
      </div>

      {/* Featured Sequential Learning Track Selector */}
      <div className="mb-8 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
        {SKILL_ROADMAPS_DATA.map((rm) => (
          <button
            key={rm.id}
            onClick={() => setSelectedRoadmapId(rm.id)}
            className={`px-4 py-2.5 rounded-lg border font-medium transition-all ${
              selectedRoadmapId === rm.id
                ? 'bg-[#1e352b] text-white border-[#1e352b] shadow-xs'
                : 'bg-white text-[#3f4b43] border-[#ded7cc] hover:bg-[#ede7dc]'
            }`}
          >
            {rm.title}
          </button>
        ))}
      </div>

      {/* Active Roadmap Timeline */}
      <div className="bg-white rounded-xl border border-[#ded7cc] p-6 sm:p-8 shadow-sm mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#eee8df] gap-3">
          <div>
            <div className="text-xs text-[#856126] font-medium uppercase tracking-wider mb-1">
              Step-by-Step Learning Progression · {activeRoadmap.domain}
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#1e352b]">
              {activeRoadmap.title}
            </h3>
            <p className="text-xs text-[#525f57] mt-1">{activeRoadmap.overview}</p>
          </div>
          <button
            onClick={() =>
              onAskAI(`Create a customized 90-day study timetable for the ${activeRoadmap.title} track. Break it down week by week with daily 2-hour practice sessions.`)
            }
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-[#eef4f0] text-[#1e352b] hover:bg-[#ddebe2] border border-[#c4d7cc] self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
            <span>Generate Study Schedule</span>
          </button>
        </div>

        {/* Steps */}
        <div className="mt-8 space-y-6">
          {activeRoadmap.stages.map((st) => (
            <div key={st.step} className="flex gap-4 items-start group">
              <div className="w-8 h-8 rounded-full bg-[#1e352b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                {st.step}
              </div>
              <div className="flex-1 bg-[#faf8f5] p-5 rounded-lg border border-[#e5dfd5] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-sm sm:text-base text-[#1e352b]">
                    {st.title}
                  </h4>
                  <span className="text-[11px] text-[#69766e]">Stage {st.step}</span>
                </div>
                <p className="text-xs text-[#414d45] leading-relaxed">{st.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div>
                    <span className="font-semibold text-[#1e352b] block text-[11px] mb-1">
                      Recommended Tools:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {st.recommendedTools.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[11px] rounded-xs bg-white border border-[#ded7cc] text-[#333d37]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-[#1e352b] block text-[11px] mb-1">
                      Free Verified Resources:
                    </span>
                    <div className="space-y-1">
                      {st.freeResources.map((res, i) => (
                        <a
                          key={i}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] text-[#7a4810] hover:text-[#4d2d09] underline"
                        >
                          <span>{res.name}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Essential Career Prep Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Pillar 1: Resume */}
        <div className="bg-white p-6 rounded-xl border border-[#ded7cc] space-y-3">
          <div className="w-9 h-9 rounded-md bg-[#eef4f0] flex items-center justify-center text-[#1e352b]">
            <FileText className="w-5 h-5 text-[#284437]" />
          </div>
          <h4 className="font-bold font-serif text-base text-[#1e352b]">Resume Building</h4>
          <p className="text-xs text-[#4c5750] leading-relaxed">
            Keep it strictly 1 page. Use standard LaTeX or clean Word templates. Avoid two-column rating bars.
            Structure: Education, Technical Skills, Projects with GitHub/demo links, Work Experience, Honors.
          </p>
          <button
            onClick={() =>
              onAskAI(`Review standard resume formats for college students and give me an ATS-friendly bullet point checklist.`)
            }
            className="text-xs font-semibold text-[#1e352b] hover:text-[#28473a] underline pt-1 block"
          >
            Get Resume Checklist →
          </button>
        </div>

        {/* Pillar 2: Interview Prep */}
        <div className="bg-white p-6 rounded-xl border border-[#ded7cc] space-y-3">
          <div className="w-9 h-9 rounded-md bg-[#eef4f0] flex items-center justify-center text-[#1e352b]">
            <Users className="w-5 h-5 text-[#284437]" />
          </div>
          <h4 className="font-bold font-serif text-base text-[#1e352b]">Interview Preparation</h4>
          <p className="text-xs text-[#4c5750] leading-relaxed">
            Master behavioral storytelling using the <strong>STAR method</strong> (Situation, Task, Action, Result).
            Prepare 3 success stories and 1 failure where you learned a crucial lesson.
          </p>
          <button
            onClick={() =>
              onAskAI(`Simulate a mock behavioral interview for a student applying for their first internship. Ask me 3 questions one by one.`)
            }
            className="text-xs font-semibold text-[#1e352b] hover:text-[#28473a] underline pt-1 block"
          >
            Start Mock Interview →
          </button>
        </div>

        {/* Pillar 3: Internship Playbook */}
        <div className="bg-white p-6 rounded-xl border border-[#ded7cc] space-y-3">
          <div className="w-9 h-9 rounded-md bg-[#eef4f0] flex items-center justify-center text-[#1e352b]">
            <Briefcase className="w-5 h-5 text-[#284437]" />
          </div>
          <h4 className="font-bold font-serif text-base text-[#1e352b]">Internship Guidance</h4>
          <p className="text-xs text-[#4c5750] leading-relaxed">
            Start applying in your 2nd year. Optimize your LinkedIn profile with clean headline.
            Leverage Wellfound, Internshala, and polite personalized cold outreach to startup founders.
          </p>
          <button
            onClick={() =>
              onAskAI(`Write a polite, high-converting cold email template for a college student reaching out to a founder or engineering manager for an internship.`)
            }
            className="text-xs font-semibold text-[#1e352b] hover:text-[#28473a] underline pt-1 block"
          >
            Cold Email Templates →
          </button>
        </div>

        {/* Pillar 4: Free Learning */}
        <div className="bg-white p-6 rounded-xl border border-[#ded7cc] space-y-3">
          <div className="w-9 h-9 rounded-md bg-[#eef4f0] flex items-center justify-center text-[#1e352b]">
            <GraduationCap className="w-5 h-5 text-[#284437]" />
          </div>
          <h4 className="font-bold font-serif text-base text-[#1e352b]">Free Learning Hub</h4>
          <p className="text-xs text-[#4c5750] leading-relaxed">
            Never pay for basic certifications. Use Coursera Financial Aid / Free Audit, Harvard CS50,
            NPTEL by IIT professors, and FreeCodeCamp for industry-grade curriculum.
          </p>
          <button
            onClick={() =>
              onAskAI(`List the top 5 completely free courses from premier universities (Harvard, MIT, IIT) for computer science and data analysis.`)
            }
            className="text-xs font-semibold text-[#1e352b] hover:text-[#28473a] underline pt-1 block"
          >
            View Top Free Courses →
          </button>
        </div>
      </div>

      {/* Real-World Project Ideas Showcase */}
      <div className="bg-white rounded-xl border border-[#ded7cc] p-6 sm:p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-serif text-[#1e352b]">
              Curated Hands-On Project Ideas
            </h3>
            <p className="text-xs text-[#525f57] mt-0.5">
              Stand out to hiring managers by solving genuine user problems rather than cloning generic tutorials.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectIdeas.map((proj, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-[#faf8f5] border border-[#e5dfd5] space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#856126] font-medium">
                  <span>{proj.domain}</span>
                  <span>{proj.tech}</span>
                </div>
                <h4 className="font-bold font-serif text-sm text-[#1e352b] mt-1">{proj.title}</h4>
                <p className="text-xs text-[#4a554e] leading-relaxed mt-1">{proj.description}</p>
              </div>
              <button
                onClick={() =>
                  onAskAI(`Help me architect the project "${proj.title}" using ${proj.tech}. What are the database schema, key API endpoints, and step-by-step implementation guide?`)
                }
                className="self-start text-xs font-semibold text-[#1e352b] hover:text-[#28473a] underline flex items-center gap-1 pt-1"
              >
                <Sparkles className="w-3 h-3 text-[#b45309]" />
                <span>Get Step-by-Step Architecture Guide</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
