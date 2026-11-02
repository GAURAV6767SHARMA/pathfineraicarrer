'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { StudentProfile, ChatMessage } from '@/lib/types';
import { Sparkles, Send, Trash2, User, Copy, Check, AlertCircle, Loader2, ArrowRight, BookOpen, Compass } from 'lucide-react';

interface GeminiMentorChatProps {
  studentProfile: StudentProfile | null;
  onOpenProfile: () => void;
  initialPrompt?: string;
}

export default function GeminiMentorChat({
  studentProfile,
  onOpenProfile,
  initialPrompt,
}: GeminiMentorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const studentName = studentProfile?.name ? studentProfile.name.split(' ')[0] : 'there';
    const welcomeContent = `Hello ${studentName}! I'm your **PathFinder AI Career Mentor**, powered by Gemini.

I'm here to help you navigate:
* **Academic Streams & Courses:** What to choose after 10th, 12th, or graduation.
* **Course Comparisons:** Objective evaluations of B.Tech vs BCA, B.Com vs BBA, MBBS vs allied medicine.
* **Entrance Exam Strategy:** Timelines and preparation guidance for JEE, NEET, CUET, CLAT, etc.
* **Alternative Backup Routes:** Realistic pathways if you missed an entrance cutoff or have a restricted education budget.

${studentProfile?.name ? `I see you are in **${studentProfile.currentLevel}** with an interest in **${studentProfile.careerGoal || 'career planning'}**.` : 'You can create your student profile anytime to receive customized recommendations!'}

What's on your mind today?`;

    return [
      {
        id: 'welcome-msg',
        role: 'model',
        content: welcomeContent,
        timestamp: 'Just now',
      },
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [useProfileContext, setUseProfileContext] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = React.useCallback(async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          studentProfile: useProfileContext ? studentProfile : null,
        }),
      });

      const data = await res.json();
      const modelReply: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content:
          data.reply ||
          "I've received your query, but could not generate a response. Please check your internet connection and try asking again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelReply]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content:
          "I ran into an unexpected connection issue. Please feel free to retry your question, or ask about specific course requirements!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading, messages, studentProfile, useProfileContext]);

  // Execute initial prompt if passed
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      const timer = setTimeout(() => {
        handleSend(initialPrompt);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialPrompt, handleSend]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const clearChat = () => {
    if (confirm('Are you sure you want to clear your conversation history?')) {
      setMessages([]);
    }
  };

  const starterPrompts = [
    'Analyze my student profile and suggest 3 high-potential careers',
    'Compare B.Tech CSE vs BCA for a student with limited tuition budget',
    'What are the best alternative pathways if I do not clear NEET?',
    'How can I prepare for CUET without paying for coaching classes?',
    'What skills should I learn in 1st year college to get internships early?',
  ];

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center space-y-2">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#546057] flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
          <span>Gemini 3.8 Flash · Interactive Counseling Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e352b] tracking-tight">
          PathFinder AI Career Mentor
        </h2>
        <p className="text-xs sm:text-sm text-[#4c5850] max-w-xl mx-auto">
          Multi-turn career counseling grounded in real college requirements, exam patterns,
          and practical alternative pathways.
        </p>
      </div>

      {/* Main Chat Box Container */}
      <div className="bg-white rounded-xl border border-[#ded7cc] shadow-sm flex flex-col h-[75vh] min-h-[580px] overflow-hidden">
        {/* Top Chat Toolbar */}
        <div className="bg-[#faf8f5] px-5 py-3 border-b border-[#ded7cc] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></div>
            <span className="font-semibold text-[#1e352b]">PathFinder Mentor Online</span>
            <span className="text-[#8a968e]">·</span>
            <span className="text-[#64726a]">Model: gemini-3.8-flash</span>
          </div>

          <div className="flex items-center gap-3">
            {studentProfile?.name ? (
              <label className="flex items-center gap-1.5 cursor-pointer text-[#3c4740]">
                <input
                  type="checkbox"
                  checked={useProfileContext}
                  onChange={(e) => setUseProfileContext(e.target.checked)}
                  className="rounded text-[#1e352b] focus:ring-[#1e352b] w-3.5 h-3.5 accent-[#1e352b]"
                />
                <span>Personalize with my profile</span>
              </label>
            ) : (
              <button
                type="button"
                onClick={onOpenProfile}
                className="text-[#1e352b] font-medium underline"
              >
                + Link Student Profile
              </button>
            )}

            <button
              type="button"
              onClick={clearChat}
              className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
              title="Clear conversation history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#faf8f5]/40">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-[#284437] text-white'
                      : 'bg-[#eef4f0] text-[#1e352b] border border-[#cfded4]'
                  }`}
                >
                  {isUser ? (
                    studentProfile?.name ? (
                      studentProfile.name.charAt(0).toUpperCase()
                    ) : (
                      <User className="w-4 h-4" />
                    )
                  ) : (
                    <Compass className="w-4 h-4 text-[#8a6833]" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`relative max-w-[85%] sm:max-w-[78%] rounded-xl p-4 text-xs sm:text-sm shadow-2xs ${
                    isUser
                      ? 'bg-[#1e352b] text-white rounded-tr-xs'
                      : 'bg-white border border-[#ded7cc] text-[#2c3731] rounded-tl-xs'
                  }`}
                >
                  {/* Markdown or Plain Text */}
                  {isUser ? (
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  ) : (
                    <div className="space-y-2 leading-relaxed font-normal">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => <h1 className="font-bold text-base text-[#1e352b] mt-2 mb-1">{children}</h1>,
                          h2: ({ children }) => <h2 className="font-bold text-sm text-[#1e352b] mt-2 mb-1">{children}</h2>,
                          h3: ({ children }) => <h3 className="font-semibold text-xs text-[#1e352b] mt-1.5 mb-0.5">{children}</h3>,
                          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 mb-2">{children}</ol>,
                          li: ({ children }) => <li className="pl-0.5">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold text-[#1e352b]">{children}</strong>,
                          code: ({ children }) => <code className="bg-[#f0ebe0] px-1 py-0.5 rounded text-[11px] font-mono text-[#7a4810]">{children}</code>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}

                  {/* Message Meta & Copy Action */}
                  <div
                    className={`mt-2 flex items-center justify-between text-[10px] ${
                      isUser ? 'text-[#a6b8ad]' : 'text-[#849289]'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="p-1 hover:text-[#1e352b] transition-colors ml-2"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-[#eef4f0] text-[#1e352b] border border-[#cfded4] flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 text-[#8a6833]" />
              </div>
              <div className="bg-white border border-[#ded7cc] rounded-xl rounded-tl-xs p-4 shadow-2xs flex items-center gap-2 text-xs text-[#525f57]">
                <Loader2 className="w-4 h-4 animate-spin text-[#1e352b]" />
                <span>PathFinder Mentor is analyzing your question...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        {messages.length < 5 && (
          <div className="px-4 py-2 bg-[#f4efe5] border-t border-[#ded7cc] overflow-x-auto whitespace-nowrap flex gap-2 text-xs">
            {starterPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p)}
                className="px-3 py-1 rounded-full bg-white border border-[#cfc8bd] text-[#3c4640] hover:bg-[#1e352b] hover:text-white transition-colors shrink-0 text-[11px]"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-[#ded7cc] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about college cutoffs, choosing a stream, comparing degrees, or career roadmaps..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-lg bg-[#faf8f5] border border-[#d8d1c3] focus:outline-none focus:ring-1 focus:ring-[#1e352b] text-[#24211d]"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2.5 rounded-lg bg-[#1e352b] text-white hover:bg-[#28473a] disabled:opacity-40 transition-all shrink-0 flex items-center gap-1.5 font-semibold text-xs shadow-xs"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
