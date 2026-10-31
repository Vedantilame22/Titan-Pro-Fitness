import React from 'react';
import {
  Flame,
  Radio,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../common/Button';
import { useAudio } from '../../context/AudioContext';

interface HeroSectionProps {
  onExplorePlans: () => void;
  onExploreEquipments: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePlans,
  onExploreEquipments,
}) => {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtle Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-normal">
              Free Ad-Free Radio & Pro Workout Splits included with all memberships
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase leading-[1.06]">
            Forge Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300">
              Ultimate
            </span>{' '}
            Physique
          </h1>

          <p className="mt-6 text-base sm:text-lg font-normal text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Welcome to <span className="font-medium text-slate-900 dark:text-slate-200">Titan Pro Fitness</span>.
            Engineered with certified Olympic machinery, master coaching protocols, and a focused atmosphere backed by 24/7 ad-free pump music.
          </p>

          {/* Clean Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="primary"
              onClick={onExplorePlans}
              icon={<ArrowRight className="w-4 h-4 text-black" />}
              className="w-full sm:w-auto"
            >
              Explore Membership Plans
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={togglePlay}
              icon={<Radio className={`w-4 h-4 ${isPlaying ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`} />}
              className="w-full sm:w-auto"
            >
              {isPlaying ? 'Pause Gym Beats' : 'Tune in to Gym Radio'}
            </Button>
          </div>

          <div className="mt-5">
            <button
              onClick={onExploreEquipments}
              className="text-xs font-normal text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors"
            >
              Or browse our 80+ Olympic machines & equipment gallery →
            </button>
          </div>

          {/* Floor Statistics - Spacious, Breathable Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-[#0d0f17]/70 border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-black/5 backdrop-blur-sm">
            <div className="text-center p-2">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                12,000<span className="text-emerald-500 text-lg font-normal ml-0.5">sqft</span>
              </div>
              <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-1">
                Spacious Gym Floor
              </p>
            </div>

            <div className="text-center p-2 border-l border-slate-200 dark:border-slate-800/80">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                80<span className="text-emerald-500 text-xl font-normal">+</span>
              </div>
              <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-1">
                Pro Grade Machines
              </p>
            </div>

            <div className="text-center p-2 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800/80">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                4.9<span className="text-amber-400 text-xl ml-0.5">★</span>
              </div>
              <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-1">
                Member Google Rating
              </p>
            </div>

            <div className="text-center p-2 border-t md:border-t-0 border-l border-slate-200 dark:border-slate-800/80">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-emerald-500">
                100%
              </div>
              <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-1">
                Ad-Free Beats & Radio
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
