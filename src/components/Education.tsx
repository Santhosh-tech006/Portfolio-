import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { GraduationCap, Award, Calendar, CheckCircle2, Sparkles, School } from 'lucide-react';
import { motion } from 'motion/react';

interface EducationMilestone {
  id: string;
  year: string;
  periodLabel: string;
  qualification: string;
  stream?: string;
  institution: string;
  location: string;
  scoreOrCgpa?: string;
  status: string;
  isCurrent: boolean;
  highlights: string[];
}

export const Education: React.FC = () => {
  const milestones: EducationMilestone[] = [
    {
      id: 'edu-class-10',
      year: '2022',
      periodLabel: 'Completed 2022',
      qualification: 'Class 10 (SSLC)',
      institution: 'Government Model Higher Secondary School',
      location: 'Kavindapadi, Erode',
      status: 'Completed',
      isCurrent: false,
      highlights: [
        'State Board Curriculum with high foundational aptitude in Mathematics & Science',
        'Built early interest in logical reasoning and computer fundamentals',
      ],
    },
    {
      id: 'edu-class-12',
      year: '2024',
      periodLabel: 'Completed 2024',
      qualification: 'Class 12 (HSC)',
      stream: 'Computer Science & Mathematics',
      institution: 'Government Model Higher Secondary School',
      location: 'Kavindapadi, Erode',
      scoreOrCgpa: '74%',
      status: 'Completed',
      isCurrent: false,
      highlights: [
        'Major Focus: Physics, Chemistry, Mathematics, Computer Science',
        'Academic Percentage: 74%',
      ],
    },
    {
      id: 'edu-btech',
      year: '2024–2028',
      periodLabel: '2024 – 2028 · 3rd Year',
      qualification: 'B.Tech Artificial Intelligence and Data Science',
      institution: 'Velalar College of Engineering and Technology (VCET)',
      location: 'Erode, Tamil Nadu',
      scoreOrCgpa: 'CGPA: 8.22',
      status: 'Currently Pursuing',
      isCurrent: true,
      highlights: [
        'Consistent academic performance: 8.22 CGPA (up to 4th semester)',
        'Key Coursework: Machine Learning, Deep Learning, Data Structures, Algorithms, DBMS',
        'Active participant in AI hackathons, technical symposia & engineering projects',
      ],
    },
  ];

  return (
    <section id="education" className="py-24 sm:py-32 bg-[#000000] border-t border-[#292929] relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#292929] text-xs font-mono font-medium text-[#22D3EE] mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>ACADEMIC BACKGROUND</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Education
            </h2>

            <p className="text-sm sm:text-base text-[#A0A0A0] mt-3 leading-relaxed">
              Chronological academic progression from school foundation to specialized B.Tech studies in Artificial Intelligence & Data Science.
            </p>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------------ */}
        {/* DESKTOP TIMELINE: True Horizontal Line with Milestone Cards */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden md:block relative pt-12 pb-6">
          
          {/* Continuous Horizontal Line Running Across the Page */}
          <div className="absolute top-[80px] left-8 right-8 h-[2px] bg-[#292929]" aria-hidden="true">
            <div className="h-full w-full bg-gradient-to-r from-[#292929] via-[#3B82F6]/60 to-[#22D3EE]/80" />
          </div>

          {/* 3 Milestones Grid along the line */}
          <div className="grid grid-cols-3 gap-8 relative z-10">
            {milestones.map((item, index) => (
              <ScrollReveal key={item.id} delay={0.1 * (index + 1)}>
                <div className="flex flex-col items-center group">
                  
                  {/* 1. Year Header Displayed Above the Line */}
                  <div className="mb-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                        item.isCurrent
                          ? 'bg-[#181818] text-[#22D3EE] border border-[#3B82F6]/70 shadow-sm shadow-blue-500/20'
                          : 'bg-[#111111] text-white border border-[#292929] group-hover:border-[#3B82F6]'
                      }`}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* 2. Circular Dot on the Horizontal Line */}
                  <div className="relative flex items-center justify-center my-1">
                    {/* Pulsing ring for current degree */}
                    {item.isCurrent && (
                      <span className="absolute w-8 h-8 rounded-full bg-[#3B82F6]/25 animate-ping" />
                    )}
                    
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                        item.isCurrent
                          ? 'bg-[#000000] border-2 border-[#22D3EE] shadow-[0_0_14px_rgba(34,211,238,0.6)]'
                          : 'bg-[#000000] border-2 border-[#3B82F6] group-hover:border-[#22D3EE] group-hover:scale-110 shadow-md shadow-blue-950/40'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.isCurrent ? 'bg-[#22D3EE]' : 'bg-[#3B82F6] group-hover:bg-[#22D3EE]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* 3. Milestone Card Displayed Below the Line */}
                  <div className="mt-8 w-full">
                    <div
                      className={`p-6 rounded-2xl bg-[#111111] border transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1 ${
                        item.isCurrent
                          ? 'border-[#3B82F6]/50 shadow-xl shadow-blue-950/20 hover:border-[#22D3EE]'
                          : 'border-[#292929] hover:border-[#3B82F6] hover:shadow-lg hover:shadow-black/60'
                      }`}
                    >
                      <div>
                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-3 text-xs font-mono">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-medium text-[11px] ${
                              item.isCurrent
                                ? 'bg-blue-950/60 text-[#22D3EE] border border-blue-500/40'
                                : 'bg-[#181818] text-[#A0A0A0] border border-[#292929]'
                            }`}
                          >
                            {item.isCurrent ? (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                                <span>Currently Pursuing</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>Completed</span>
                              </>
                            )}
                          </span>

                          {item.scoreOrCgpa && (
                            <span className="font-bold text-[#22D3EE] bg-[#181818] border border-[#292929] px-2 py-0.5 rounded-md">
                              {item.scoreOrCgpa}
                            </span>
                          )}
                        </div>

                        {/* Qualification Title */}
                        <h3 className="text-lg font-bold text-white group-hover:text-[#22D3EE] transition-colors leading-snug">
                          {item.qualification}
                        </h3>

                        {/* Institution Name */}
                        <p className="text-xs font-medium text-[#3B82F6] mt-2 flex items-start gap-1.5">
                          <School className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-400" />
                          <span>{item.institution}</span>
                        </p>

                        <p className="text-[11px] font-mono text-[#A0A0A0] mt-1 pl-5">
                          {item.location}
                        </p>
                      </div>

                      {/* Highlights */}
                      <ul className="mt-4 pt-4 border-t border-[#292929] space-y-1.5 text-xs text-[#A0A0A0]">
                        {item.highlights.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-[#3B82F6] shrink-0 mt-0.5 font-bold">›</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

        {/* ------------------------------------------------------------------ */}
        {/* MOBILE TIMELINE: Clean Vertical Layout with Line Down the Left */}
        {/* ------------------------------------------------------------------ */}
        <div className="md:hidden relative pl-6 border-l-2 border-[#292929] space-y-10 ml-2">
          {milestones.map((item, index) => (
            <ScrollReveal key={item.id} delay={0.08 * (index + 1)}>
              <div className="relative group">
                
                {/* Circular Node on Left Vertical Line */}
                <div
                  className={`absolute -left-[33px] top-1.5 w-5 h-5 rounded-full flex items-center justify-center ${
                    item.isCurrent
                      ? 'bg-[#000000] border-2 border-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.7)]'
                      : 'bg-[#000000] border-2 border-[#3B82F6]'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.isCurrent ? 'bg-[#22D3EE]' : 'bg-[#3B82F6]'
                    }`}
                  />
                </div>

                {/* Milestone Card */}
                <div
                  className={`p-5 rounded-2xl bg-[#111111] border transition-all ${
                    item.isCurrent
                      ? 'border-[#3B82F6]/60 shadow-lg shadow-blue-950/20'
                      : 'border-[#292929]'
                  }`}
                >
                  {/* Year & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#181818] text-[#22D3EE] border border-[#292929]">
                      {item.year}
                    </span>

                    {item.scoreOrCgpa && (
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 px-2 py-0.5 rounded">
                        {item.scoreOrCgpa}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mt-1">
                    {item.qualification}
                  </h3>

                  <p className="text-xs font-medium text-[#3B82F6] mt-1.5">
                    {item.institution}
                  </p>

                  <p className="text-[11px] font-mono text-[#A0A0A0] mt-0.5">
                    {item.location} · {item.status}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-3 pt-3 border-t border-[#292929] space-y-1 text-xs text-[#A0A0A0]">
                    {item.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#3B82F6] shrink-0">›</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
