import { GoogleGenAI, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { goal, currentLevel, stream, budget, timeHorizon } = await req.json();

    if (!goal) {
      return NextResponse.json({ error: 'Career goal is required' }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({
        title: goal,
        overview: `Career path for ${goal} based on standard academic milestones.`,
        steps: [
          {
            stepNumber: 1,
            title: 'Choose the Foundation Degree or Stream',
            description: `Select the appropriate academic program after ${currentLevel || 'school'} tailored for ${goal}.`,
            duration: '1-3 Years',
            actionItems: ['Research accredited universities', 'Prepare for relevant entrance exams', 'Review admission cutoffs'],
          },
          {
            stepNumber: 2,
            title: 'Master Essential Industry Skills',
            description: 'Learn the required technical and communication tools through coursework and self-study.',
            duration: '6-12 Months',
            actionItems: ['Complete online foundational courses', 'Join student clubs and societies', 'Build core competencies'],
          },
          {
            stepNumber: 3,
            title: 'Build Portfolio and Real-World Projects',
            description: 'Apply theoretical concepts to hands-on practical problems.',
            duration: '6 Months',
            actionItems: ['Create 2-3 substantial projects', 'Document results publicly', 'Participate in competitions'],
          },
          {
            stepNumber: 4,
            title: 'Internships and Industry Networking',
            description: 'Gain practical workplace exposure and mentorship.',
            duration: '3-6 Months',
            actionItems: ['Apply for summer internships', 'Connect with industry mentors', 'Refine professional resume'],
          },
          {
            stepNumber: 5,
            title: 'Entry-Level Launch and Specialization',
            description: 'Transition into professional employment or advanced higher education.',
            duration: 'Ongoing',
            actionItems: ['Target high-growth organizations', 'Prepare for behavioral and technical interviews', 'Plan continuous certifications'],
          },
        ],
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `
Create a realistic, step-by-step career roadmap for a student with the following context:
- Target Career Goal: ${goal}
- Current Education Level: ${currentLevel || 'Class 12th'}
- Stream / Background: ${stream || 'General'}
- Education Budget Constraint: ${budget || 'Moderate'}
- Target Time Horizon: ${timeHorizon || '3-5 Years'}

Provide a detailed structured breakdown with 5-6 sequential steps.
Each step must have:
- stepNumber (integer)
- title (concise headline)
- description (actionable guidance)
- duration (estimated time, e.g. "6 Months", "Year 1-2")
- actionItems (array of 3-4 specific checklist tasks)
Also provide a short overview summary and recommended backup alternative if primary route encounters hurdles.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            overview: { type: Type.STRING },
            backupAlternative: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  actionItems: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['stepNumber', 'title', 'description', 'duration', 'actionItems'],
              },
            },
          },
          required: ['title', 'overview', 'steps'],
        },
      },
    });

    const roadmapData = JSON.parse(response.text || '{}');
    return NextResponse.json(roadmapData);
  } catch (error: unknown) {
    console.error('Error generating roadmap:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate AI roadmap. Falling back to preset plans.',
      },
      { status: 500 }
    );
  }
}
