import React from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Radio,
  ArrowRight,
  Sparkles,
  Bot,
  Zap,
  ShieldCheck,
  Activity,
  Award,
} from 'lucide-react';
import { Button } from '../common/Button';
import { useAudio } from '../../context/AudioContext';
import { HaikeiMeshGlow } from '../haikei/HaikeiMeshGlow';
import { HaikeiPolyGrid } from '../haikei/HaikeiPolyGrid';
import { HaikeiWaves } from '../haikei/HaikeiWaves';

interface HeroSectionProps {
  onExplorePlans: () => void;
  onExploreEquipments: () => void;
  onOpenAiPlanner?: () => void;
  onOpenNutrition?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePlans,
  onExploreEquipments,
  onOpenAiPlanner,
  onOpenNutrition,
}) => {
  const { isPlaying, togglePlay } = useAudio();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300 },
    },
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-28">
      {/* Haikei Mesh Glow Background Generator */}
      <HaikeiMeshGlow variant="crimson" />
      <HaikeiPolyGrid opacity={0.06} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Athletic Announcement Pill */}
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-xs font-semibold text-slate-200">
                Titan Pro Performance • Powered by Manus AI & Motion
              </span>
            </div>
          </motion.div>

          {/* Main Display Headline with Athletic Crimson & Flame */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.02]"
          >
            Forge Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 drop-shadow-sm">
              Ultimate
            </span>{' '}
            Physique
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-xl font-normal text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Engineered with certified Olympic biomechanical machinery, autonomous AI periodization protocols, and an uncompromising atmosphere backed by 24/7 ad-free pump soundscapes.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Button
              size="lg"
              variant="glow"
              onClick={onExplorePlans}
              icon={<ArrowRight className="w-4 h-4 text-white" />}
              className="w-full sm:w-auto shadow-red-600/35"
            >
              Explore Membership Plans
            </Button>

            {onOpenAiPlanner && (
              <Button
                size="lg"
                variant="secondary"
                onClick={onOpenAiPlanner}
                icon={<Bot className="w-4 h-4 text-red-400" />}
                className="w-full sm:w-auto border-red-500/30"
              >
                Manus AI Workout Protocol
              </Button>
            )}

            <Button
              size="lg"
              variant="outline"
              onClick={togglePlay}
              icon={
                <Radio
                  className={`w-4 h-4 ${
                    isPlaying ? 'text-red-500 animate-pulse' : 'text-slate-400'
                  }`}
                />
              }
              className="w-full sm:w-auto"
            >
              {isPlaying ? 'Pause Gym Radio' : 'Tune in to Gym Radio'}
            </Button>
          </motion.div>

          {/* Secondary Quick-Pills */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs"
          >
            <button
              onClick={onExploreEquipments}
              className="text-slate-400 hover:text-red-400 transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Explore 80+ Olympic Machines Gallery</span>
              <span>→</span>
            </button>
            {onOpenNutrition && (
              <>
                <span className="text-slate-700 hidden sm:inline">•</span>
                <button
                  onClick={onOpenNutrition}
                  className="text-slate-400 hover:text-orange-400 transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>Precision Macro Calculator</span>
                  <span>→</span>
                </button>
              </>
            )}
          </motion.div>

          {/* Floor Statistics - Glassmorphic Dark Grid */}
          <motion.div
            variants={itemVariants}
            className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-[#0e1017]/90 border border-slate-800/90 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            <div className="text-center p-2 group">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center">
                12,000<span className="text-red-500 text-lg font-bold ml-0.5">sqft</span>
              </div>
              <p className="text-xs font-medium text-slate-400 mt-1">
                Air-Cooled Arena Floor
              </p>
            </div>

            <div className="text-center p-2 border-l border-slate-800/80">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center">
                80<span className="text-orange-500 text-xl font-bold ml-0.5">+</span>
              </div>
              <p className="text-xs font-medium text-slate-400 mt-1">
                Olympic Calibrated Racks
              </p>
            </div>

            <div className="text-center p-2 border-t md:border-t-0 md:border-l border-slate-800/80">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center">
                4.9<span className="text-amber-400 text-xl ml-1">★</span>
              </div>
              <p className="text-xs font-medium text-slate-400 mt-1">
                500+ Verified Athlete Reviews
              </p>
            </div>

            <div className="text-center p-2 border-t md:border-t-0 border-l border-slate-800/80">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-red-500 flex items-center justify-center">
                100%
              </div>
              <p className="text-xs font-medium text-slate-400 mt-1">
                Ad-Free Workout Radio
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Haikei Organic Wave Divider */}
      <div className="mt-12 sm:mt-16">
        <HaikeiWaves variant="bottom" />
      </div>
    </section>
  );
};
