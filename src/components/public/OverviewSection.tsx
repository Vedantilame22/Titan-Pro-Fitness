import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Dumbbell,
  Clock,
  HeartPulse,
  Award,
  Music,
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { Card } from '../common/Card';
import { LiveGymCapacityMeter } from '../watermelon/LiveGymCapacityMeter';
import { BmiCalculatorCard } from '../watermelon/BmiCalculatorCard';
import { HaikeiMeshGlow } from '../haikei/HaikeiMeshGlow';

interface OverviewSectionProps {
  onExplorePlans?: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onExplorePlans }) => {
  const highlights = [
    {
      icon: <Dumbbell className="w-5 h-5 text-red-500" />,
      title: 'Olympic-Grade Machinery',
      description:
        'Hammer Strength ISO-lateral presses, Rogue Monster power cages, Eleiko calibrated plates, and biomechanically perfected resistance curves.',
    },
    {
      icon: <Music className="w-5 h-5 text-orange-500" />,
      title: 'Ad-Free Gym Soundscape',
      description:
        'Zero commercial interruptions. Curated 128-140 BPM Phonk, Hardstyle, and Synthwave radio streams piped across precision acoustics.',
    },
    {
      icon: <Award className="w-5 h-5 text-amber-500" />,
      title: 'Certified Master Coaches',
      description:
        'CSCS and ACE certified coaches providing custom hypertrophy periodization, body recomposition blueprints, and mobility screens.',
    },
    {
      icon: <Clock className="w-5 h-5 text-rose-500" />,
      title: 'Extended Operating Windows',
      description:
        'Open early from 5:30 AM to late night 10:30 PM, plus dedicated weekend recovery access so work or study never derails your streak.',
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-red-500" />,
      title: 'Functional Turf & High-Ventilation',
      description:
        'Sled tracks, Concept2 SkiErgs, curved non-motorized treadmills, and high-CFM fresh airflow to keep training capacity at its peak.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-orange-500" />,
      title: 'Sanitized Spa & Locker Suites',
      description:
        'Touchless RFID lockers, private high-pressure rain showers, infrared sauna recovery units, and chilled hydration stations.',
    },
  ];

  return (
    <section id="overview" className="relative py-16 md:py-28 overflow-hidden">
      <HaikeiMeshGlow variant="crimson" className="opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeText="Why Titan Pro"
          badgeVariant="red"
          title="Engineered For Real"
          highlightWord="Transformation"
          subtitle="We stripped away corporate gym clutter to build a modern training sanctuary where biomechanical machinery meets high-energy focus."
        />

        {/* Live Watermelon UI Interactive Radar & Calculator Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          <LiveGymCapacityMeter />
          <BmiCalculatorCard onExplorePlans={onExplorePlans} />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {highlights.map((item, idx) => (
            <Card
              key={idx}
              hoverEffect
              glass
              className="group p-7 sm:p-8 rounded-3xl border-slate-800/90"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-normal text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
