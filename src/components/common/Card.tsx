import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  glow = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6 transition-all duration-300',
        'bg-white dark:bg-[#11131a] border-slate-200 dark:border-slate-800/80',
        hoverEffect && 'hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-emerald-950/20',
        glow && 'border-emerald-500/40 glow-neon',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
