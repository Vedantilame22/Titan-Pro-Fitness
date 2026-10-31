import React from 'react';
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

export const OverviewSection: React.FC = () => {
  const highlights = [
    {
      icon: <Dumbbell className="w-5 h-5 text-emerald-500" />,
      title: 'Olympic-Grade Machinery',
      description:
        'Hammer Strength, Rogue Power Cages, Eleiko barbells, and calibrated bumper plates engineered for biomechanical alignment and progressive overload.',
    },
    {
      icon: <Music className="w-5 h-5 text-emerald-500" />,
      title: 'Ad-Free Gym Atmosphere',
      description:
        'Zero commercial breaks, zero random advertisements. Non-stop curated Phonk, EDM, and high-energy workout radio stations.',
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-500" />,
      title: 'Certified Master Coaches',
      description:
        'NASM, ACE, and CSCS certified trainers providing custom workout splits, technique coaching, and nutritional blueprinting.',
    },
    {
      icon: <Clock className="w-5 h-5 text-emerald-500" />,
      title: 'Extended Operating Hours',
      description:
        'Open early from 5:30 AM to late night 10:30 PM so you never have to skip your daily session around work or study commitments.',
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-emerald-500" />,
      title: 'Dedicated Conditioning Turf',
      description:
        'Curved non-motorized treadmills, Assault AirBikes, Concept2 rowers, and a functional turf track for peak athletic conditioning.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: 'Luxury Showers & Locker Zone',
      description:
        'Spotless locker facilities with hot water showers, steam recovery options, and sanitized private changing rooms.',
    },
  ];

  return (
    <section id="overview" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Why Titan Pro"
          badgeVariant="neon"
          title="Engineered For Real"
          highlightWord="Transformation"
          subtitle="We stripped away corporate clutter to build a modern training sanctuary where raw effort meets premium machinery and electric energy."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {highlights.map((item, idx) => (
            <Card key={idx} hoverEffect className="group p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c0e14]">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-all">
                {item.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2.5">
                {item.title}
              </h3>
              <p className="text-xs font-normal text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
