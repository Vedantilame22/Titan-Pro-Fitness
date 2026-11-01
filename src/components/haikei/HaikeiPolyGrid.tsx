import React from 'react';

interface HaikeiPolyGridProps {
  className?: string;
  opacity?: number;
}

export const HaikeiPolyGrid: React.FC<HaikeiPolyGridProps> = ({
  className = '',
  opacity = 0.05,
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full text-slate-800 dark:text-emerald-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0 L150 100 L300 30 L450 120 L600 40 L750 140 L900 60 L1050 130 L1200 40 L1200 600 L0 600 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />
        <path
          d="M0 150 L200 220 L400 160 L600 240 L800 170 L1000 230 L1200 180"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M0 320 L180 280 L360 360 L540 300 L720 380 L900 310 L1080 390 L1200 340"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="6 6"
        />
        <path
          d="M0 480 L220 440 L440 510 L660 450 L880 520 L1100 470 L1200 500"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
};
