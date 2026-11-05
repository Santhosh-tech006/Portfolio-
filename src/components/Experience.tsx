import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExperienceCategory } from '../types/portfolio';
import { Briefcase, Calendar, MapPin, PlusCircle, CheckCircle } from 'lucide-react';

interface ExperienceProps {
  onOpenAdmin: () => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onOpenAdmin }) => {
  const { experiences, isAdminLoggedIn } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory>('Academic Projects');

  const categories: ExperienceCategory[] = [
    'Academic Projects',
    'Freelance Work',
    'Technical Learning',
    'Leadership',
    'Team Collaborations',
    'Personal Initiatives',
  ];

  const filteredExperiences = experiences.filter(exp => exp.category === selectedCategory);

  return (
    <section id="experience" className="py-24 relative border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
              07. Hands-on Journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Experience & Activities
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mt-3 rounded-full" />
          </div>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-500 hover:text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-lg bg-cyan-500/5 self-start sm:self-auto"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Add Entry in Admin
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 p-1.5 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl w-fit">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {filteredExperiences.length > 0 ? (
          <div className="space-y-6">
            {filteredExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md shadow-sm hover:border-cyan-500/40 transition-all flex flex-col md:flex-row gap-6 justify-between"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                      @ {exp.organization}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.contributions && exp.contributions.length > 0 && (
                    <ul className="space-y-1.5 pt-2">
                      {exp.contributions.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col md:items-end gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* High quality clear empty state (as required: no invented entries, clear empty state) */
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
            <div className="w-12 h-12 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 flex items-center justify-center mx-auto mb-3 text-slate-500">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
              No entries in "{selectedCategory}" yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
              This category is ready for your practical work, student team milestones, leadership positions, or freelance engagements.
            </p>
            <button
              onClick={onOpenAdmin}
              className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Add Experience Entry
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
