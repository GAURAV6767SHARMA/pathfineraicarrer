'use client';

import React, { useState, useEffect } from 'react';
import { PRESET_ROADMAP_GOALS } from '@/lib/data';
import { StudentProfile } from '@/lib/types';
import { Target, CheckCircle2, Circle, Sparkles, Plus, Trash2, Edit3, Save, Calendar, ArrowRight, Loader2 } from 'lucide-react';

interface GoalPlannerProps {
  studentProfile: StudentProfile | null;
  onAskAI: (prompt: string) => void;
  presetTargetCareer?: string;
}

interface MilestoneStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

export default function GoalPlanner({
  studentProfile,
  onAskAI,
  presetTargetCareer,
}: GoalPlannerProps) {
  // Helper to read initial state from storage
  const [activeGoalTitle, setActiveGoalTitle] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pathfinder_active_goal');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.title) return parsed.title;
        }
      } catch {
        // ignore
      }
    }
    return presetTargetCareer || 'Software Developer';
  });

  const [steps, setSteps] = useState<MilestoneStep[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pathfinder_active_goal');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.steps) return parsed.steps;
        }
      } catch {
        // ignore
      }
    }
    return PRESET_ROADMAP_GOALS[0].steps;
  });

  const [personalNotes, setPersonalNotes] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pathfinder_active_goal');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.notes) return parsed.notes;
        }
      } catch {
        // ignore
      }
    }
    return '';
  });

  const [customGoalInput, setCustomGoalInput] = useState<string>('');
  const [isGeneratingAIRoadmap, setIsGeneratingAIRoadmap] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState('');

  // Save to localStorage whenever steps change
  const saveToStorage = (title: string, currentSteps: MilestoneStep[], notes: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        'pathfinder_active_goal',
        JSON.stringify({ title, steps: currentSteps, notes })
      );
    } catch {
      // ignore
    }
  };

  const loadPresetOrCustomGoal = (title: string) => {
    const found = PRESET_ROADMAP_GOALS.find((g) => g.title.toLowerCase() === title.toLowerCase());
    if (found) {
      setActiveGoalTitle(found.title);
      setSteps(found.steps);
      saveToStorage(found.title, found.steps, personalNotes);
    } else {
      setActiveGoalTitle(title);
      const defaultSteps: MilestoneStep[] = [
        { id: '1', title: 'Research core requirements & degrees', description: `Explore degree options and entry criteria for ${title}.`, completed: false },
        { id: '2', title: 'Build foundational subject knowledge', description: 'Study foundational concepts and clear key examinations.', completed: false },
        { id: '3', title: 'Develop required practical skillset', description: 'Take online courses and master essential domain tools.', completed: false },
        { id: '4', title: 'Create real portfolio projects & case studies', description: 'Demonstrate proof of work through tangible outputs.', completed: false },
        { id: '5', title: 'Prepare professional resume & networking', description: 'Connect with industry mentors and prepare interview responses.', completed: false },
        { id: '6', title: 'Apply for internships & entry-level roles', description: 'Submit applications and launch your career.', completed: false },
      ];
      setSteps(defaultSteps);
      saveToStorage(title, defaultSteps, personalNotes);
    }
  };

  // Handle external trigger (e.g. from Career Explorer "Set as Goal")
  useEffect(() => {
    if (presetTargetCareer && presetTargetCareer !== activeGoalTitle) {
      const timer = setTimeout(() => {
        loadPresetOrCustomGoal(presetTargetCareer);
      }, 0);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetTargetCareer]);

  const toggleStep = (stepId: string) => {
    const updated = steps.map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s));
    setSteps(updated);
    saveToStorage(activeGoalTitle, updated, personalNotes);
  };

  const addCustomStep = () => {
    if (!newStepTitle.trim()) return;
    const newStep: MilestoneStep = {
      id: Date.now().toString(),
      title: newStepTitle.trim(),
      description: 'Custom milestone added by student.',
      completed: false,
    };
    const updated = [...steps, newStep];
    setSteps(updated);
    setNewStepTitle('');
    saveToStorage(activeGoalTitle, updated, personalNotes);
  };

  const removeStep = (stepId: string) => {
    const updated = steps.filter((s) => s.id !== stepId);
    setSteps(updated);
    saveToStorage(activeGoalTitle, updated, personalNotes);
  };

  const handleNotesChange = (val: string) => {
    setPersonalNotes(val);
    saveToStorage(activeGoalTitle, steps, val);
  };

  // Generate Custom Roadmap via Gemini API
  const generateAIRoadmap = async () => {
    if (!activeGoalTitle) return;
    setIsGeneratingAIRoadmap(true);
    try {
      const res = await fetch('/api/gemini/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: activeGoalTitle,
          currentLevel: studentProfile?.currentLevel || 'Class 12th',
          stream: studentProfile?.stream || 'Science',
          budget: studentProfile?.budgetPreference || 'Moderate',
        }),
      });
      const data = await res.json();
      if (data.steps && Array.isArray(data.steps)) {
        const aiSteps: MilestoneStep[] = data.steps.map((st: { stepNumber: number; title: string; description: string; duration?: string }) => ({
          id: `ai-${st.stepNumber}-${Date.now()}`,
          title: st.title,
          description: `${st.description} (Estimated: ${st.duration || 'Flexible'})`,
          completed: false,
        }));
        setSteps(aiSteps);
        saveToStorage(activeGoalTitle, aiSteps, personalNotes);
      }
    } catch (e) {
      console.error(e);
      alert('Unable to generate AI roadmap right now. You can continue using preset roadmaps!');
    } finally {
      setIsGeneratingAIRoadmap(false);
    }
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center space-y-3">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#546057]">
          08 · Action & Execution
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e352b] tracking-tight">
          Career Roadmap & Goal Planner
        </h2>
        <p className="text-sm sm:text-base text-[#465149] max-w-2xl mx-auto leading-relaxed">
          Break your ambitious career vision down into achievable sequential steps. Track completed
          milestones, set target dates, and keep your career momentum moving forward.
        </p>
      </div>

      {/* Preset Selector + Custom Creator */}
      <div className="bg-white rounded-xl border border-[#ded7cc] p-6 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#eee8df]">
          <span className="text-xs font-bold text-[#1e352b] uppercase tracking-wider">
            Choose Your Target Goal:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_ROADMAP_GOALS.map((g) => (
              <button
                key={g.title}
                onClick={() => loadPresetOrCustomGoal(g.title)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeGoalTitle.toLowerCase() === g.title.toLowerCase()
                    ? 'bg-[#1e352b] text-white shadow-xs'
                    : 'bg-[#faf8f5] text-[#3c4640] border border-[#ded7cc] hover:bg-[#ede7dc]'
                }`}
              >
                {g.title}
              </button>
            ))}
          </div>
        </div>

        {/* Custom goal form */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <input
            type="text"
            value={customGoalInput}
            onChange={(e) => setCustomGoalInput(e.target.value)}
            placeholder="Or type custom career (e.g. UX Designer, Psychologist, Pilot)..."
            className="flex-1 px-3.5 py-2 text-xs rounded-md bg-[#faf8f5] border border-[#d8d1c3] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
          />
          <button
            type="button"
            onClick={() => {
              if (customGoalInput.trim()) {
                loadPresetOrCustomGoal(customGoalInput.trim());
                setCustomGoalInput('');
              }
            }}
            className="px-4 py-2 text-xs font-semibold rounded-md bg-[#284437] text-white hover:bg-[#1e352b]"
          >
            Create Goal Roadmap
          </button>
        </div>
      </div>

      {/* Main Roadmap Tracker Box */}
      <div className="bg-white rounded-xl border border-[#ded7cc] shadow-sm overflow-hidden mb-8">
        {/* Banner with Progress Bar */}
        <div className="bg-[#1e352b] text-[#f2ede4] p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-[#c2d6c9] uppercase tracking-wider mb-1">
                Active Career Goal
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
                {activeGoalTitle}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={generateAIRoadmap}
                disabled={isGeneratingAIRoadmap}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md bg-[#faf8f5] text-[#1e352b] hover:bg-white transition-colors"
              >
                {isGeneratingAIRoadmap ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#b45309]" />
                    <span>Generating AI Roadmap...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
                    <span>Generate AI Milestone Breakdown</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress metric */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs text-[#c2d6c9]">
              <span>
                Roadmap Progress: {completedCount} of {steps.length} milestones completed
              </span>
              <span className="font-bold text-white">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-[#e8a36e] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Milestone Steps Checklist */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#eee8df]">
            <span className="text-xs font-bold text-[#1e352b] uppercase tracking-wider">
              Step-by-Step Task Checklist
            </span>
            <span className="text-[11px] text-[#6b7770]">Click circle to mark complete</span>
          </div>

          <div className="space-y-3">
            {steps.map((st, idx) => (
              <div
                key={st.id}
                className={`p-4 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                  st.completed
                    ? 'bg-[#eef4f0]/60 border-[#d2e2d8]'
                    : 'bg-[#faf8f5] border-[#ded7cc]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => toggleStep(st.id)}
                    className="mt-0.5 text-stone-400 hover:text-[#1e352b] transition-colors shrink-0"
                  >
                    {st.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#8a968e]" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#856126]">
                        Step {idx + 1}
                      </span>
                      <h4
                        className={`text-sm font-bold ${
                          st.completed
                            ? 'line-through text-[#6e7b73]'
                            : 'text-[#1e352b]'
                        }`}
                      >
                        {st.title}
                      </h4>
                    </div>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        st.completed ? 'text-[#7d8b82]' : 'text-[#47534b]'
                      }`}
                    >
                      {st.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeStep(st.id)}
                  className="text-stone-400 hover:text-red-700 p-1 rounded-sm shrink-0"
                  title="Remove step"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add custom step input */}
          <div className="pt-2 flex gap-2">
            <input
              type="text"
              value={newStepTitle}
              onChange={(e) => setNewStepTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomStep();
                }
              }}
              placeholder="Add personal task (e.g. Finish Chapter 4 Physics, Register for exam)..."
              className="flex-1 px-3 py-2 text-xs rounded-md bg-[#faf8f5] border border-[#d8d1c3] focus:outline-none focus:ring-1 focus:ring-[#1e352b]"
            />
            <button
              type="button"
              onClick={addCustomStep}
              className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-md bg-[#284437] text-white hover:bg-[#1e352b]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Step</span>
            </button>
          </div>
        </div>

        {/* Personal Notes / Journal Section */}
        <div className="p-6 sm:p-8 bg-[#faf8f5] border-t border-[#ded7cc] space-y-2">
          <span className="text-xs font-bold text-[#1e352b] uppercase tracking-wider block">
            Personal Reflection & Study Notes (Auto-Saved)
          </span>
          <textarea
            rows={3}
            value={personalNotes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Record notes on target colleges, exam test scores, weak chapters to revise, or book recommendations..."
            className="w-full p-3 text-xs rounded-md bg-white border border-[#ded7cc] focus:outline-none focus:ring-1 focus:ring-[#1e352b] text-[#2c3731]"
          />
        </div>
      </div>
    </div>
  );
}
