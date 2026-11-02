import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { messages, studentProfile } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "I'm ready to help you with your career and academic journey! However, the GEMINI_API_KEY is not configured yet in the environment secrets. Once provided, I can give live intelligent analysis of your courses, exam strategies, and career decisions.",
        },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Build personalized system instruction with student profile if available
    let profileContext = '';
    if (studentProfile) {
      profileContext = `
STUDENT'S ACTIVE PROFILE:
- Name: ${studentProfile.name || 'Student'}
- Current Academic Level: ${studentProfile.currentLevel || 'Not specified'}
- Stream / Background: ${studentProfile.stream || 'General'}
- Previous Marks / Performance: ${studentProfile.previousMarks || 'Not specified'}
- Favorite / Strong Subjects: ${(studentProfile.favoriteSubjects || []).join(', ') || 'Various'}
- Personal Interests: ${(studentProfile.interests || []).join(', ') || 'Exploring'}
- Work Preference Style: ${studentProfile.preferredStyle || 'Balanced'}
- Target Career Goal: ${studentProfile.careerGoal || 'Seeking guidance'}
- Education Budget Constraint: ${studentProfile.budgetPreference || 'Moderate'}
- Known Skills: ${(studentProfile.skills || []).join(', ') || 'Foundational'}
- Projects & Achievements: ${studentProfile.projectsAndAchievements || 'None listed yet'}
- Financial Assistance Needed: ${studentProfile.financialAssistanceNeeded ? 'Yes (looking for scholarships / affordable routes)' : 'Standard'}
`;
    }

    const systemInstruction = `
You are "PathFinder AI Mentor", an expert, empathetic, highly knowledgeable, and realistic Education and Career Guidance Counselor.
Your objective is to empower students and their parents to make informed, practical, and ambitious academic and career decisions.

Core Rules & Persona:
1. Address the student warmly (use their name if provided).
2. Ground all advice in practical reality (e.g. entrance exam cutoffs, real course durations, realistic college fees, job market trends, government vs private colleges).
3. If the student has a budget constraint, always highlight affordable government colleges, polytechnics, state universities, scholarships (e.g. NSP, Pragati, Reliance), or accredited low-cost degrees (like IGNOU, SWAYAM, IIT Madras Online BS).
4. Never discourage a student. If their marks or entrance scores are low, proactively provide high-potential alternative pathways (e.g., BCA instead of B.Tech CSE, B.Pharm/Physiotherapy instead of MBBS, Lateral Entry through Diploma).
5. Format answers clearly using Markdown (bold key terms, clean bullet points, short paragraphs). Keep responses focused, encouraging, and structured.
6. Answer the three essential student questions whenever applicable:
   - Where am I now? (Clarify their standing and foundation)
   - Where can I go? (List concrete degrees, careers, and alternatives)
   - How can I reach there? (Provide step-by-step roadmap, exams, and free skill resources)

${profileContext}
`;

    // Map conversation history to Gemini content structure
    // Valid roles for Gemini contents: 'user' | 'model'
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
      },
    });

    const reply = response.text || "I'm here to help you navigate your academic and career options. Could you clarify your question or current education level?";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number };
    console.error('Error in Gemini chat API:', err);
    return NextResponse.json(
      {
        reply: `I encountered a momentary issue connecting to the guidance model (${err.message || 'Network delay'}). Please feel free to try again or ask a specific question regarding courses, streams, or career roadmaps!`,
      },
      { status: 200 }
    );
  }
}
