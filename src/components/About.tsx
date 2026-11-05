import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Award, Compass, Target, Code, Cpu } from 'lucide-react';

export const About: React.FC = () => {
  const { personalInfo } = usePortfolio();

  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider font-mono">
            About Me
          </span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Professional Profile & Academic Background
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-3" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Prose Bio */}
          <div className="lg:col-span-7 space-y-5 bg-white p-8 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 leading-snug">
              Passionate AI & Data Science Student Dedicated to Building Scalable, Intelligent Systems
            </h3>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              I am an enthusiastic <strong className="text-slate-900 font-semibold">B.Tech Artificial Intelligence and Data Science</strong> student at <strong className="text-slate-900 font-semibold">Velalar College of Engineering and Technology (VCET)</strong>, Erode. My passion lies at the intersection of algorithmic mathematics, machine learning theory, and real-world software engineering.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              My core interests encompass <strong className="text-slate-900 font-semibold">Artificial Intelligence, Machine Learning, Deep Learning, Generative AI</strong>, and <strong className="text-slate-900 font-semibold">modern software development</strong>. Through academic research, hands-on implementations, hackathons, and independent projects, I develop solutions that bridge the gap between complex neural models and user-facing applications.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Whether optimizing biomedical MRI image enhancement pipelines, building full-stack platforms for academy management, or integrating intelligent game analysis engines, I strive for clean architecture, measurable accuracy, and production reliability.
            </p>

            {/* Core Interest Badges */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2 font-mono">
                Primary Interests
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Artificial Intelligence',
                  'Machine Learning',
                  'Deep Learning',
                  'Generative AI',
                  'Full-Stack Development',
                  'Data Science',
                  'Software Engineering',
                ].map(item => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Academic & Career Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Card 1: Academic Metric */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400">Current Standing</span>
                <h4 className="text-base font-bold text-slate-900">CGPA: 8.22</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Consistent performance across 4 semesters in B.Tech AI & DS.
                </p>
              </div>
            </div>

            {/* Card 2: Institution */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400">Undergraduate College</span>
                <h4 className="text-base font-bold text-slate-900">Velalar College of Engg. & Tech.</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Erode, Tamil Nadu · Anna University Affiliated (2024–2028).
                </p>
              </div>
            </div>

            {/* Card 3: Engineering Focus */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400">Technical Trajectory</span>
                <h4 className="text-base font-bold text-slate-900">AI & Deep Learning Pipelines</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Convolutional neural networks, computer vision, and full-stack integration.
                </p>
              </div>
            </div>

            {/* Card 4: Career Objective */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400">Career Goal</span>
                <h4 className="text-base font-bold text-slate-900">Software & AI Engineer</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Targeting campus placement, internship, and engineering roles.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
