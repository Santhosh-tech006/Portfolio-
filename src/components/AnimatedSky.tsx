import React from 'react';

export const AnimatedSky: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle minimal radial ambient spotlight in hero for pure black aesthetic */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[800px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59, 130, 246, 0.28) 0%, rgba(34, 211, 238, 0.12) 40%, transparent 70%)',
        }}
      />
    </div>
  );
};
