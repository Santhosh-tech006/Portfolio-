import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Terminal,
  Cpu,
  Brain,
  Layers,
  Flame,
  Sparkles,
  GitBranch,
  Github,
  Cloud,
  Code,
  Activity,
  Database,
  Radio,
  FileCode,
  Palette,
  Braces,
  Atom,
  Server,
  Coffee,
  CheckCircle,
} from 'lucide-react';

interface SkillsProps {
  onOpenAdmin: () => void;
}

export const TechnicalSkills: React.FC<SkillsProps> = ({ onOpenAdmin }) => {
  const { skillCategories } = usePortfolio();

  // Dynamic icon resolver
  const getIcon = (name: string, iconName?: string) => {
    switch (iconName || name) {
      case 'Python':
      case 'Terminal':
        return <Terminal className="w-4 h-4 text-blue-600" />;
      case 'Java':
      case 'Coffee':
        return <Coffee className="w-4 h-4 text-amber-600" />;
      case 'SQL':
      case 'MySQL':
      case 'Database':
        return <Database className="w-4 h-4 text-emerald-600" />;
      case 'Machine Learning':
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-blue-600" />;
      case 'Deep Learning':
      case 'Brain':
        return <Brain className="w-4 h-4 text-indigo-600" />;
      case 'TensorFlow':
      case 'Layers':
        return <Layers className="w-4 h-4 text-orange-600" />;
      case 'PyTorch':
      case 'Flame':
        return <Flame className="w-4 h-4 text-red-600" />;
      case 'Generative AI':
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'Git':
      case 'GitBranch':
        return <GitBranch className="w-4 h-4 text-rose-600" />;
      case 'GitHub':
        return <Github className="w-4 h-4 text-slate-800" />;
      case 'Google Colab':
      case 'Cloud':
        return <Cloud className="w-4 h-4 text-amber-500" />;
      case 'VS Code':
      case 'Code':
        return <Code className="w-4 h-4 text-sky-600" />;
      case 'Grafana':
      case 'Activity':
        return <Activity className="w-4 h-4 text-orange-600" />;
      case 'MQTT':
      case 'Radio':
        return <Radio className="w-4 h-4 text-teal-600" />;
      case 'HTML':
      case 'FileCode':
        return <FileCode className="w-4 h-4 text-orange-600" />;
      case 'CSS':
      case 'Palette':
        return <Palette className="w-4 h-4 text-blue-600" />;
      case 'JavaScript':
      case 'Braces':
        return <Braces className="w-4 h-4 text-yellow-600" />;
      case 'React':
      case 'Atom':
        return <Atom className="w-4 h-4 text-cyan-600" />;
      case 'Node.js':
      case 'Server':
        return <Server className="w-4 h-4 text-emerald-600" />;
      default:
        return <Code className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider font-mono">
            Technical Stack
          </span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Core Technical Skills
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-3" />
          <p className="text-sm text-slate-600 mt-3 max-w-xl">
            Practical competencies acquired through coursework, independent engineering, and technical development.
          </p>
        </div>

        {/* 4 Categorized Clean Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map(category => (
            <div
              key={category.id}
              className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="mb-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {category.description}
                  </p>
                </div>
                <span className="text-xs font-mono font-medium text-slate-400">
                  {category.skills.length} skills
                </span>
              </div>

              {/* Clean skill badges with icons (no invented percentages!) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {category.skills.map(skill => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-200 transition-colors"
                  >
                    <div className="shrink-0">
                      {getIcon(skill.name, skill.iconName)}
                    </div>
                    <span className="text-xs font-medium text-slate-800 truncate">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
