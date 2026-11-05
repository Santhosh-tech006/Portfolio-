import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Monogram / Initials */}
        <div className="w-16 h-16 rounded-2xl border border-cyan-500/40 bg-gradient-to-tr from-cyan-950/60 to-slate-900 flex items-center justify-center shadow-lg shadow-cyan-500/10">
          <span className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            SS
          </span>
        </div>

        {/* Name */}
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-tight text-white">
            S. SANTHOSH
          </h1>
          <p className="text-xs font-mono text-cyan-400 mt-0.5">
            AI & Data Science Portfolio
          </p>
        </div>

        {/* Loading track */}
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
