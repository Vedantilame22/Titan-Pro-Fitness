import React from 'react';
import { Badge } from './Badge';

interface SectionHeaderProps {
  badgeText?: string;
  badgeVariant?: 'neon' | 'amber' | 'cyan' | 'slate' | 'red' | 'flame';
  title: string;
  highlightWord?: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeVariant = 'neon',
  title,
  highlightWord,
  subtitle,
  centered = true,
}) => {
  return (
    <div className={`mb-14 ${centered ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'}`}>
      {badgeText && (
        <div className="mb-3.5">
          <Badge variant={badgeVariant} dot>
            {badgeText}
          </Badge>
        </div>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
        {title}{' '}
        {highlightWord && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 font-extrabold">
            {highlightWord}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base font-normal text-slate-400 leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
