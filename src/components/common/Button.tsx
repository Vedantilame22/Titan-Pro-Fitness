import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

type MotionButtonProps = React.ComponentProps<typeof motion.button>;

interface ButtonProps extends Omit<MotionButtonProps, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer overflow-hidden font-medium';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5 font-medium',
    md: 'px-5 py-2.5 text-xs sm:text-sm gap-2 font-semibold',
    lg: 'px-7 py-3.5 text-sm sm:text-base gap-2.5 font-bold',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 hover:shadow-red-500/45',
    glow:
      'bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 text-white shadow-lg shadow-red-600/35 hover:shadow-orange-500/50 hover:brightness-110',
    secondary:
      'bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 shadow-md',
    outline:
      'border border-slate-700 text-slate-200 hover:border-red-500 hover:text-red-400 bg-transparent hover:bg-red-500/10',
    danger:
      'bg-red-700 hover:bg-red-800 text-white shadow-md shadow-red-700/25',
    ghost:
      'hover:bg-slate-800/70 text-slate-300',
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
