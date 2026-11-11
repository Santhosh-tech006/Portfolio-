import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Cpu } from 'lucide-react';

interface SkillItem {
  name: string;
  tag?: string;
}

export const TechnicalSkills: React.FC = () => {
  // Exactly the 22 required skills, directly displayed without category headers
  const skills: SkillItem[] = [
    { name: 'Python', tag: 'Core' },
    { name: 'Java', tag: 'Core' },
    { name: 'C', tag: 'Core' },
    { name: 'SQL', tag: 'Data' },
    { name: 'MySQL', tag: 'Database' },
    { name: 'NumPy', tag: 'Computation' },
    { name: 'Pandas', tag: 'Data' },
    { name: 'Matplotlib', tag: 'Viz' },
    { name: 'Seaborn', tag: 'Viz' },
    { name: 'Scikit-learn', tag: 'ML' },
    { name: 'TensorFlow', tag: 'Deep Learning' },
    { name: 'Power BI', tag: 'Analytics' },
    { name: 'Microsoft Excel', tag: 'Analytics' },
    { name: 'Git', tag: 'VCS' },
    { name: 'GitHub', tag: 'Collab' },
    { name: 'Google Colab', tag: 'Platform' },
    { name: 'Jupyter Notebook', tag: 'Environment' },
    { name: 'VS Code', tag: 'Editor' },
    { name: 'HTML', tag: 'Web' },
    { name: 'CSS', tag: 'Styling' },
    { name: 'JavaScript', tag: 'Web' },
    { name: 'React.js', tag: 'Frontend' },
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 bg-[#000000] border-t border-[#292929] relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#292929] text-xs font-mono font-medium text-[#22D3EE] mb-4">
              <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>TECHNICAL COMPETENCIES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Core Technical Skills
            </h2>

            <p className="text-sm sm:text-base text-[#A0A0A0] mt-3 leading-relaxed">
              Direct practical expertise across programming languages, machine learning frameworks, data science libraries, database systems, and development tools.
            </p>
          </div>
        </ScrollReveal>

        {/* Minimalist 22 Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {skills.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={0.02 * (index + 1)}>
              <div
                data-cursor={skill.name}
                className="group relative p-4 rounded-xl bg-[#111111] border border-[#292929] hover:border-[#3B82F6] hover:bg-[#151515] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between h-[84px] shadow-sm shadow-black/40"
              >
                {/* Top indicator dot */}
                <div className="flex items-center justify-between">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#292929] group-hover:bg-[#22D3EE] transition-colors" />
                  <span className="text-[10px] font-mono text-[#A0A0A0]/60 group-hover:text-[#3B82F6] transition-colors">
                    {skill.tag}
                  </span>
                </div>

                {/* Skill Name */}
                <span className="text-sm font-semibold text-white group-hover:text-[#22D3EE] transition-colors tracking-tight truncate">
                  {skill.name}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
