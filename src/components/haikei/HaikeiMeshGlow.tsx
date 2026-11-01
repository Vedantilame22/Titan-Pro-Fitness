import React from 'react';

interface HaikeiMeshGlowProps {
  variant?: 'crimson' | 'flame' | 'amber' | 'cyan' | 'mixed' | 'emerald';
  className?: string;
}

export const HaikeiMeshGlow: React.FC<HaikeiMeshGlowProps> = ({
  variant = 'crimson',
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      {/* Intense Gym Ambient Mesh Blur Blobs */}
      {(variant === 'crimson' || variant === 'emerald') && (
        <>
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[650px] h-[520px] bg-red-600/15 rounded-full blur-[140px] mix-blend-screen" />
          <div className="absolute top-[25%] -left-[10%] w-[480px] h-[480px] bg-orange-600/12 rounded-full blur-[110px]" />
          <div className="absolute top-[35%] -right-[10%] w-[520px] h-[520px] bg-rose-600/12 rounded-full blur-[120px]" />
        </>
      )}

      {variant === 'flame' && (
        <>
          <div className="absolute -top-[15%] right-[10%] w-[600px] h-[550px] bg-orange-500/15 rounded-full blur-[130px]" />
          <div className="absolute bottom-[10%] -left-[5%] w-[480px] h-[480px] bg-red-600/12 rounded-full blur-[110px]" />
        </>
      )}

      {variant === 'amber' && (
        <>
          <div className="absolute -top-[10%] -right-[5%] w-[550px] h-[550px] bg-amber-500/15 rounded-full blur-[130px]" />
          <div className="absolute bottom-[10%] -left-[5%] w-[450px] h-[450px] bg-orange-500/12 rounded-full blur-[100px]" />
        </>
      )}

      {variant === 'cyan' && (
        <>
          <div className="absolute top-[10%] left-1/3 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-1/4 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px]" />
        </>
      )}

      {variant === 'mixed' && (
        <>
          <div className="absolute -top-[15%] left-[20%] w-[650px] h-[550px] bg-red-600/15 rounded-full blur-[140px]" />
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-orange-500/12 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[450px] h-[450px] bg-rose-600/10 rounded-full blur-[110px]" />
        </>
      )}

      {/* Subtle Haikei geometric dot matrix overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="haikei-dots-crimson" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#ff334b" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#haikei-dots-crimson)" />
      </svg>
    </div>
  );
};
