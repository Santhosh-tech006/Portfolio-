import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Download, ArrowRight, Github, Linkedin, MapPin, GraduationCap } from 'lucide-react';

export const Hero: React.FC = () => {
  const { personalInfo } = usePortfolio();

  return (
    <section id="home" className="pt-32 pb-20 sm:pt-36 sm:pb-24 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>{personalInfo.statusBadge || 'B.Tech AI & DS · 3rd Year'}</span>
            </div>

            {/* Name */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {personalInfo.name}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-blue-600 mt-2">
                {personalInfo.title}
              </p>
            </div>

            {/* Tagline quote */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              "{personalInfo.tagline}"
            </p>

            {/* Academic badge highlights */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Velalar College of Engineering and Technology</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Erode, Tamil Nadu, India</span>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={personalInfo.resumeUrl || '#resume'}
                download="S_Santhosh_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-xs"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>

              <a
                href="#projects"
                onClick={e => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors"
              >
                View Projects
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-blue-700 text-sm font-medium transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-blue-600" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Clean Profile Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              
              {/* Clean frame */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
                <img
                  src={personalInfo.profilePhoto}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                  onError={e => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                {/* Clean fallback placeholder */}
                <div
                  style={{ display: 'none' }}
                  className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-700 p-6 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-3">
                    SS
                  </div>
                  <p className="font-semibold text-slate-900">{personalInfo.name}</p>
                  <p className="text-xs text-slate-500 mt-1">B.Tech AI & Data Science</p>
                </div>
              </div>

              {/* Minimal caption badge below photo */}
              <div className="mt-3 text-center">
                <p className="text-xs text-slate-500 font-medium">
                  {personalInfo.name} · B.Tech AI & DS (2024–2028)
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
