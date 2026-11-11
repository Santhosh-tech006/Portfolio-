import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface ProfileImageProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ className = '', size = 'lg' }) => {
  const { personalInfo } = usePortfolio();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine size classes with explicit dimensions to prevent Cumulative Layout Shift (CLS)
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48 sm:w-56 sm:h-56',
    lg: 'w-64 h-64 sm:w-80 sm:h-80 lg:w-[350px] lg:h-[350px]',
  }[size];

  const primaryPhoto = personalInfo.profilePhoto || '/profile.jpg';

  return (
    <div className={`relative group ${sizeClasses} ${className}`}>
      
      {/* 1. Subtle Atmospheric Ambient Glow behind frame */}
      <div
        className="absolute -inset-2 bg-gradient-to-r from-blue-600/25 via-sky-400/20 to-indigo-600/25 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Light Animated Gradient Border Container */}
      <div className="relative w-full h-full p-[3px] rounded-3xl bg-gradient-to-tr from-blue-600 via-sky-300 to-blue-500 animate-border-gradient shadow-xl shadow-blue-500/10 transition-transform duration-500 group-hover:scale-[1.01]">
        
        {/* 3. Inner Clean Masked Frame */}
        <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#111111] relative">
          
          {/* Skeleton shimmer while loading */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-[#181818] animate-pulse flex items-center justify-center">
              <span className="text-xs font-mono text-zinc-400">Loading photo...</span>
            </div>
          )}

          {!imageError ? (
            <img
              src={primaryPhoto}
              alt={personalInfo.name}
              width={350}
              height={350}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-top transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                // Try fallback to /profile.jpg if primary fails
                if (primaryPhoto !== '/profile.jpg') {
                  const img = new Image();
                  img.src = '/profile.jpg';
                  img.onload = () => {
                    personalInfo.profilePhoto = '/profile.jpg';
                    setImageLoaded(true);
                  };
                  img.onerror = () => setImageError(true);
                } else {
                  setImageError(true);
                }
              }}
            />
          ) : (
            /* Clean fallback avatar block */
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl font-bold mb-3 shadow-inner">
                SS
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-base">
                {personalInfo.name}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                AI & Data Science
              </p>
            </div>
          )}

          {/* Minimal glass caption badge at bottom */}
          <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent backdrop-blur-[2px] flex items-center justify-between text-white">
            <div>
              <p className="text-xs font-semibold drop-shadow">{personalInfo.name}</p>
              <p className="text-[10px] font-mono text-sky-300 drop-shadow">VCET · 2024–2028</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" title="Active Student" />
          </div>

        </div>

      </div>

    </div>
  );
};
