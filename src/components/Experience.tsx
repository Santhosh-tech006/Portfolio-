import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExperienceCategory } from '../types/portfolio';
import { ScrollReveal } from './ScrollReveal';
import {
  Briefcase,
  Calendar,
  MapPin,
  PlusCircle,
  CheckCircle,
  Trophy,
  Award,
  ExternalLink,
} from 'lucide-react';

interface ExperienceProps {
  onOpenAdmin: () => void;
}

type MainViewTab = 'experience' | 'achievements' | 'certifications';

export const Experience: React.FC<ExperienceProps> = ({ onOpenAdmin }) => {
  const { experiences, achievements, certifications } = usePortfolio();
  
  // Main Tab: Experience, Hackathons, or Certifications
  const [activeTab, setActiveTab] = useState<MainViewTab>('experience');

  // Sub-category filter for Experience
  const [selectedExpCategory, setSelectedExpCategory] = useState<ExperienceCategory>('Academic Projects');

  // Sub-category filter for Achievements
  const [selectedAchCategory, setSelectedAchCategory] = useState<string>('All');

  const experienceCategories: ExperienceCategory[] = [
    'Academic Projects',
    'Freelance Work',
    'Technical Learning',
    'Leadership',
    'Team Collaborations',
    'Personal Initiatives',
  ];

  const achievementCategories = [
    { id: 'All', label: 'All Events' },
    { id: 'Hackathons', label: 'Hackathons' },
    { id: 'Technical Competitions', label: 'Competitions' },
    { id: 'Chess', label: 'Chess' },
    { id: 'Workshops', label: 'Workshops' },
  ];

  const filteredExperiences = experiences.filter(exp => exp.category === selectedExpCategory);

  const filteredAchievements = achievements.filter(item => {
    if (selectedAchCategory === 'All') return true;
    if (selectedAchCategory === 'Technical Competitions') {
      return item.category === 'Technical Competitions' || item.category === 'Academic';
    }
    return item.category === selectedAchCategory;
  });

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#000000] border-t border-[#292929] relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#292929] text-xs font-mono font-medium text-[#22D3EE] mb-4">
                <Briefcase className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>PRACTICAL TRACK RECORD</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Experience & Activities
              </h2>

              <p className="text-sm sm:text-base text-[#A0A0A0] mt-3 leading-relaxed">
                Applied engineering work, competitive hackathon achievements, leadership roles, and verified industry credentials.
              </p>
            </div>

            <button
              onClick={onOpenAdmin}
              data-cursor="Add Entry"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white border border-[#292929] px-3.5 py-2 rounded-xl bg-[#111111] hover:bg-[#181818] hover:border-[#3B82F6] self-start sm:self-auto transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Add in Admin</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Primary View Switcher: Experience · Hackathons · Certifications */}
        <ScrollReveal delay={0.04}>
          <div className="flex items-center gap-2 border-b border-[#292929] pb-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('experience')}
              data-cursor="Experience View"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'experience'
                  ? 'bg-[#181818] text-white border border-[#3B82F6] font-semibold shadow-xs'
                  : 'bg-[#111111] text-[#A0A0A0] border border-[#292929] hover:text-white hover:bg-[#151515]'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#3B82F6]" />
              <span>Hands-on Experience</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#252525] text-zinc-300">
                {experiences.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('achievements')}
              data-cursor="Achievements View"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'achievements'
                  ? 'bg-[#181818] text-white border border-[#3B82F6] font-semibold shadow-xs'
                  : 'bg-[#111111] text-[#A0A0A0] border border-[#292929] hover:text-white hover:bg-[#151515]'
              }`}
            >
              <Trophy className="w-4 h-4 text-[#22D3EE]" />
              <span>Hackathons & Achievements</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#252525] text-zinc-300">
                {achievements.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('certifications')}
              data-cursor="Certifications View"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'certifications'
                  ? 'bg-[#181818] text-white border border-[#3B82F6] font-semibold shadow-xs'
                  : 'bg-[#111111] text-[#A0A0A0] border border-[#292929] hover:text-white hover:bg-[#151515]'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Certifications</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#252525] text-zinc-300">
                {certifications.length}
              </span>
            </button>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------------ */}
        {/* VIEW 1: Hands-on Experience Tab */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'experience' && (
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {experienceCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedExpCategory(cat)}
                  data-cursor={`Filter: ${cat}`}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                    selectedExpCategory === cat
                      ? 'bg-[#181818] text-[#22D3EE] border-[#3B82F6] font-semibold'
                      : 'bg-[#111111] text-[#A0A0A0] border-[#292929] hover:text-white hover:bg-[#151515]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredExperiences.length > 0 ? (
              <div className="space-y-4">
                {filteredExperiences.map((exp, index) => (
                  <ScrollReveal key={exp.id} delay={0.06 * (index + 1)}>
                    <div
                      data-cursor="Experience"
                      className="p-6 sm:p-7 rounded-2xl border border-[#292929] bg-[#111111] shadow-lg shadow-black/40 hover:border-[#3B82F6] transition-all flex flex-col md:flex-row gap-6 justify-between group"
                    >
                      <div className="space-y-2.5 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                            {exp.title}
                          </h3>
                          <span className="text-xs font-mono font-medium text-[#3B82F6]">
                            @ {exp.organization}
                          </span>
                        </div>

                        <p className="text-sm text-[#A0A0A0] leading-relaxed">
                          {exp.description}
                        </p>

                        {exp.contributions && exp.contributions.length > 0 && (
                          <ul className="space-y-1 pt-1">
                            {exp.contributions.map((c, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                                <CheckCircle className="w-3.5 h-3.5 text-[#22D3EE] shrink-0 mt-0.5" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="flex flex-col md:items-end gap-1.5 text-xs font-mono text-[#A0A0A0] shrink-0">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#3B82F6]" />
                          <span>{exp.period}</span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center rounded-2xl border border-dashed border-[#292929] bg-[#111111]">
                <Briefcase className="w-8 h-8 text-zinc-600 mx-auto mb-2 opacity-60" />
                <h4 className="text-sm font-semibold text-white">
                  No entries in "{selectedExpCategory}" yet
                </h4>
                <p className="text-xs text-[#A0A0A0] max-w-sm mx-auto mt-1">
                  Add projects, club leadership, collaborative hackathons, or initiatives through the admin panel.
                </p>
                <button
                  onClick={onOpenAdmin}
                  data-cursor="Add Entry"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-medium transition-colors shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Experience Entry</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* VIEW 2: Hackathons & Achievements Tab */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'achievements' && (
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {achievementCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedAchCategory(cat.id)}
                  data-cursor={`Filter: ${cat.label}`}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                    selectedAchCategory === cat.id
                      ? 'bg-[#181818] text-[#22D3EE] border-[#3B82F6] font-semibold'
                      : 'bg-[#111111] text-[#A0A0A0] border-[#292929] hover:text-white hover:bg-[#151515]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {filteredAchievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.map((ach, index) => (
                  <ScrollReveal key={ach.id} delay={0.06 * (index + 1)}>
                    <div
                      data-cursor="Milestone"
                      className="bg-[#111111] p-6 rounded-2xl border border-[#292929] hover:border-[#3B82F6] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full shadow-lg shadow-black/40 group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-[#22D3EE] mb-2">
                          <span className="font-semibold">{ach.category}</span>
                          <span className="text-zinc-500">{ach.date}</span>
                        </div>

                        <h3 className="text-base font-bold text-white group-hover:text-[#22D3EE] transition-colors mb-2">
                          {ach.title}
                        </h3>

                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-0.5 rounded-md mb-3">
                          <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{ach.roleOrResult}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                          {ach.description}
                        </p>
                      </div>

                      {ach.isEditableParticipation && (
                        <div className="mt-5 pt-3 border-t border-[#292929] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                          <span>Verified Event</span>
                          <button
                            onClick={onOpenAdmin}
                            data-cursor="Edit"
                            className="text-[#3B82F6] hover:text-[#22D3EE] transition-colors"
                          >
                            Edit in Admin
                          </button>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="bg-[#111111] p-10 rounded-2xl border border-dashed border-[#292929] text-center">
                <Trophy className="w-8 h-8 text-zinc-600 mx-auto mb-2 opacity-60" />
                <h4 className="text-sm font-semibold text-white">
                  No entries in "{selectedAchCategory}" yet
                </h4>
                <p className="text-xs text-[#A0A0A0] max-w-sm mx-auto mt-1">
                  Add competition participation, hackathons, or workshop achievements.
                </p>
                <button
                  onClick={onOpenAdmin}
                  data-cursor="Add Entry"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-medium transition-colors shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Achievement</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* VIEW 3: Certifications Tab */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'certifications' && (
          <div>
            {certifications.length === 0 ? (
              <div className="bg-[#111111] p-10 sm:p-12 rounded-2xl border border-dashed border-[#292929] text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#181818] border border-[#292929] text-[#22D3EE] flex items-center justify-center mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  Certifications Section Ready
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-md mb-5 leading-relaxed">
                  Add your verified Coursera, NPTEL, DeepLearning.AI, or cloud credentials with verification links.
                </p>
                <button
                  onClick={onOpenAdmin}
                  data-cursor="Add Credential"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold transition-all shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Certificate in Admin Panel</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <ScrollReveal key={cert.id} delay={0.06 * (index + 1)}>
                    <div
                      data-cursor="Certificate"
                      className="bg-[#111111] p-6 rounded-2xl border border-[#292929] hover:border-[#3B82F6] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group shadow-lg shadow-black/40"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-[#22D3EE] mb-2">
                          <span className="font-semibold">{cert.issuer}</span>
                          <span className="text-zinc-500">{cert.completionDate}</span>
                        </div>

                        <h3 className="text-base font-bold text-white group-hover:text-[#22D3EE] transition-colors mb-2">
                          {cert.courseName}
                        </h3>

                        {cert.credentialId && (
                          <p className="text-xs font-mono text-zinc-400 mb-3 truncate">
                            ID: {cert.credentialId}
                          </p>
                        )}
                      </div>

                      {cert.verificationLink && (
                        <div className="pt-3 border-t border-[#292929] mt-2">
                          <a
                            href={cert.verificationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="Verify"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3B82F6] hover:text-[#22D3EE] transition-colors"
                          >
                            <span>Verify Credential</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
