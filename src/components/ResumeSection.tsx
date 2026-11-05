import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Download, Printer, FileText, CheckCircle2, GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

interface ResumeSectionProps {
  onOpenAdmin: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenAdmin }) => {
  const { personalInfo, education, skillCategories, projects, achievements } = usePortfolio();

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider font-mono">
              Curriculum Vitae
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Resume & Credentials
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full mt-3" />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <a
              href={personalInfo.resumeUrl || '#'}
              download="S_Santhosh_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Clean Paper Resume Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 sm:p-12 space-y-8">
          
          {/* Header */}
          <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {personalInfo.name}
              </h3>
              <p className="text-sm font-semibold text-blue-600 mt-0.5">
                {personalInfo.title}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {personalInfo.college}
              </p>
            </div>

            <div className="text-xs font-mono text-slate-600 space-y-1 sm:text-right">
              <div>{personalInfo.email}</div>
              <div>+91 {personalInfo.phone}</div>
              <div>{personalInfo.location}</div>
              <div className="text-blue-600">linkedin.com/in/santhoshvcet</div>
            </div>
          </div>

          {/* Objective / Summary */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Career Objective
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
              Education
            </h4>
            <div className="space-y-3">
              {education.map(item => (
                <div key={item.id} className="text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-slate-900">
                    <span>{item.degreeOrExam}</span>
                    <span className="font-mono text-xs text-slate-400 font-normal">{item.period}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-600 mt-0.5">
                    <span>{item.institution}</span>
                    <span className="font-mono text-blue-600 text-xs font-semibold">
                      {item.scoreOrCgpa}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
              Technical Proficiencies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {skillCategories.map(cat => (
                <div key={cat.id} className="p-2.5 rounded bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 text-xs block mb-1">
                    {cat.name}:
                  </span>
                  <span className="text-slate-600 text-xs">
                    {cat.skills.map(s => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
              Academic Projects
            </h4>
            <div className="space-y-4">
              {projects.map(proj => (
                <div key={proj.id} className="text-xs sm:text-sm space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{proj.title}</span>
                    <span className="text-xs font-mono text-blue-600">{proj.category}</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {proj.summary}
                  </p>
                  <p className="text-xs font-mono text-slate-400">
                    Technologies: {proj.tags.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathons & Milestones */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Hackathons & Participation
            </h4>
            <div className="space-y-2">
              {achievements.map(ach => (
                <div key={ach.id} className="text-xs flex items-center justify-between">
                  <span className="text-slate-800">
                    <strong className="font-semibold">{ach.title}</strong> — {ach.roleOrResult} ({ach.event})
                  </span>
                  <span className="font-mono text-slate-400 shrink-0 ml-4">{ach.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
