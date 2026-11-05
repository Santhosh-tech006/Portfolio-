import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, Trophy, Calendar, PlusCircle, CheckCircle } from 'lucide-react';

interface AchievementsProps {
  onOpenAdmin: () => void;
}

export const Achievements: React.FC<AchievementsProps> = ({ onOpenAdmin }) => {
  const { achievements } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Milestones' },
    { id: 'Hackathons', label: 'Hackathons' },
    { id: 'Technical Competitions', label: 'Technical Events' },
    { id: 'Chess', label: 'Chess Achievements' },
    { id: 'Workshops', label: 'Workshops & Events' },
  ];

  const filteredAchievements = achievements.filter(item => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Technical Competitions') {
      return item.category === 'Technical Competitions' || item.category === 'Academic';
    }
    return item.category === selectedCategory;
  });

  return (
    <section id="achievements" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider font-mono">
              Events & Competitions
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Hackathons & Achievements
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full mt-3" />
          </div>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 border border-slate-200 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 self-start sm:self-auto transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Event Entry</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* List of achievements */}
        {filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map(ach => (
              <div
                key={ach.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-blue-600 mb-2">
                    <span className="font-semibold">{ach.category}</span>
                    <span className="text-slate-400">{ach.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {ach.title}
                  </h3>

                  <div className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mb-3">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>{ach.roleOrResult}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                {ach.isEditableParticipation && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Verified Participation</span>
                    <button
                      onClick={onOpenAdmin}
                      className="text-blue-600 hover:underline"
                    >
                      Edit in Admin
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="bg-white p-10 rounded-xl border border-dashed border-slate-300 text-center">
            <Trophy className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60" />
            <h4 className="text-sm font-semibold text-slate-800">
              No entries in "{selectedCategory}" yet
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Add your competition participation, chess tournaments, or workshop entries through the admin panel.
            </p>
            <button
              onClick={onOpenAdmin}
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Add Entry
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
