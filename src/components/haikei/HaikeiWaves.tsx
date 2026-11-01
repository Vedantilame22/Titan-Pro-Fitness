import React from 'react';

interface HaikeiWavesProps {
  variant?: 'top' | 'bottom' | 'subtle';
  className?: string;
  fillColor?: string;
}

export const HaikeiWaves: React.FC<HaikeiWavesProps> = ({
  variant = 'bottom',
  className = '',
  fillColor = 'fill-[#08090d]'
}) => {
  if (variant === 'bottom') {
    return (
      <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}>
        <svg
          className="relative block w-full h-12 md:h-20 text-slate-100 dark:text-[#08090d]"
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,96C672,96,768,128,864,138.7C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,180L1392,180C1344,180,1248,180,1152,180C1056,180,960,180,864,180C768,180,672,180,576,180C480,180,384,180,288,180C192,180,96,180,48,180L0,180Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <path
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,180L1392,180C1344,180,1248,180,1152,180C1056,180,960,180,864,180C768,180,672,180,576,180C480,180,384,180,288,180C192,180,96,180,48,180L0,180Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <path
            d="M0,128L48,133.3C96,139,192,149,288,144C384,139,480,117,576,112C672,107,768,117,864,128C960,139,1056,149,1152,144C1248,139,1344,117,1392,107L1440,96L1440,180L1392,180C1344,180,1248,180,1152,180C1056,180,960,180,864,180C768,180,672,180,576,180C480,180,384,180,288,180C192,180,96,180,48,180L0,180Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none select-none rotate-180 ${className}`}>
      <svg
        className="relative block w-full h-12 md:h-20 text-slate-100 dark:text-[#08090d]"
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,96C672,96,768,128,864,138.7C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,180L1392,180C1344,180,1248,180,1152,180C1056,180,960,180,864,180C768,180,672,180,576,180C480,180,384,180,288,180C192,180,96,180,48,180L0,180Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
        <path
          d="M0,128L48,133.3C96,139,192,149,288,144C384,139,480,117,576,112C672,107,768,117,864,128C960,139,1056,149,1152,144C1248,139,1344,117,1392,107L1440,96L1440,180L1392,180C1344,180,1248,180,1152,180C1056,180,960,180,864,180C768,180,672,180,576,180C480,180,384,180,288,180C192,180,96,180,48,180L0,180Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
