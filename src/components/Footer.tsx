import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { personalInfo } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] text-[#A0A0A0] py-14 border-t border-[#292929] relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Identity */}
          <div className="text-center sm:text-left">
            <span className="font-bold text-white text-base tracking-tight block">
              {personalInfo.name}
            </span>
            <span className="text-xs text-[#A0A0A0] font-mono mt-0.5 block">
              B.Tech Artificial Intelligence and Data Science · VCET
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 text-[#A0A0A0]">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GitHub"
              className="hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LinkedIn"
              className="hover:text-[#22D3EE] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              data-cursor="Email"
              className="hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top */}
          <div>
            <button
              onClick={scrollToTop}
              data-cursor="Back to Top"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#292929] bg-[#111111] hover:bg-[#181818] text-xs text-zinc-300 hover:text-white transition-colors"
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#292929] text-center text-xs text-[#A0A0A0]/60 font-mono">
          © 2026 S. SANTHOSH · All rights reserved.
        </div>
      </div>
    </footer>
  );
};
