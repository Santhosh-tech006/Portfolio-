import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Calendar, Award, Building, Edit2 } from 'lucide-react';

interface EducationProps {
  onOpenAdmin: () => void;
}

export const Education: React.FC<EducationProps> = ({ onOpenAdmin }) => {
  const { education, isAdminLoggedIn } = usePortfolio();

  return (
    <section id="education" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider font-mono">
              Academic Background
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Education & Qualifications
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full mt-3" />
          </div>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 self-start sm:self-auto transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit School Details</span>
          </button>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {education.map(item => {
            const isPlaceholder = item.isPlaceholder;

            return (
              <div
                key={item.id}
                className={`p-6 sm:p-7 rounded-xl border transition-all ${
                  !isPlaceholder
                    ? 'bg-white border-slate-200 shadow-xs hover:border-blue-300'
                    : 'bg-slate-50/70 border-dashed border-slate-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 font-mono">
                        {item.level}
                      </span>
                      {!isPlaceholder && (
                        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Current Degree
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5">
                      {item.degreeOrExam}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1.5 font-medium text-slate-800">
                    <Building className="w-4 h-4 text-slate-400" />
                    <span>{item.institution}</span>
                  </div>
                  {item.boardOrUniversity && (
                    <span className="text-xs text-slate-400">
                      ({item.boardOrUniversity})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span
                    className={`text-sm font-semibold ${
                      !isPlaceholder ? 'text-blue-700' : 'text-slate-400 italic'
                    }`}
                  >
                    {item.scoreOrCgpa}
                  </span>
                </div>

                {item.highlights && item.highlights.length > 0 && !isPlaceholder && (
                  <ul className="space-y-1 text-xs text-slate-500 list-disc list-inside pt-1">
                    {item.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}

                {isPlaceholder && (
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-200/60 mt-2">
                    <span>Editable space for your 10th / 12th school details.</span>
                    <button
                      onClick={onOpenAdmin}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Fill in details &rarr;
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
