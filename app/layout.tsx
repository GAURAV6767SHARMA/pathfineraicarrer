import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'PathFinder - Education to Career Guidance Platform',
  description: 'Comprehensive career guidance, academic pathways, course comparisons, personalized assessments, and Gemini AI mentorship for students.',
  openGraph: {
    title: 'PathFinder - Education to Career Guidance Platform',
    description: 'Comprehensive career guidance, academic pathways, course comparisons, personalized assessments, and Gemini AI mentorship for students.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PathFinder - Education to Career Guidance Platform',
    description: 'Comprehensive career guidance, academic pathways, course comparisons, personalized assessments, and Gemini AI mentorship for students.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#faf8f5] text-[#24211d] antialiased selection:bg-[#d6e5db] selection:text-[#183125]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
