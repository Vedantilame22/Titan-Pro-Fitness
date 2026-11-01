import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neon' | 'amber' | 'cyan' | 'red' | 'slate' | 'flame';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neon',
  className,
  dot = false,
}) => {
  const variantStyles = {
    neon: 'bg-red-500/15 text-red-400 border-red-500/30',
    flame: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    red: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/80',
  };

  const dotColors = {
    neon: 'bg-red-500',
    flame: 'bg-orange-500',
    amber: 'bg-amber-500',
    cyan: 'bg-cyan-500',
    red: 'bg-rose-500',
    slate: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border backdrop-blur-sm tracking-wide',
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};
