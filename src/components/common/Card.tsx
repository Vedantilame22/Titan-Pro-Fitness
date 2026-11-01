import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

type MotionDivProps = React.ComponentProps<typeof motion.div>;

interface CardProps extends Omit<MotionDivProps, 'children'> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glow?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  glow = false,
  glass = false,
  className,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'rounded-3xl border p-6 sm:p-7 transition-colors duration-250',
        glass
          ? 'bg-white/80 dark:bg-[#0f1118]/80 backdrop-blur-xl border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-200/40 dark:shadow-black/50'
          : 'bg-white dark:bg-[#10121a] border-slate-200/90 dark:border-slate-800/80 shadow-md shadow-slate-200/30 dark:shadow-black/40',
        hoverEffect && 'hover:border-emerald-500/50 hover:shadow-xl dark:hover:shadow-emerald-950/20',
        glow && 'border-emerald-500/40 glow-neon',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
