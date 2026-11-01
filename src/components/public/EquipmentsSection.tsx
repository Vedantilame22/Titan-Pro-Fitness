import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, CheckCircle2 } from 'lucide-react';
import type { Equipment } from '../../types';
import { INITIAL_EQUIPMENTS } from '../../data/mockData';
import { SectionHeader } from '../common/SectionHeader';
import { Card } from '../common/Card';
import { HaikeiPolyGrid } from '../haikei/HaikeiPolyGrid';

export const EquipmentsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Free Weights', 'Machines', 'Cardio', 'Functional'];

  const getTargetMuscles = (eq: Equipment): string[] => {
    const nameLower = eq.name.toLowerCase();
    if (nameLower.includes('squat') || nameLower.includes('leg press')) {
      return ['Quadriceps', 'Glutes', 'Hamstrings'];
    }
    if (nameLower.includes('cable') || nameLower.includes('chest') || nameLower.includes('fly')) {
      return ['Pectorals', 'Deltoids', 'Triceps'];
    }
    if (nameLower.includes('dumbbell') || nameLower.includes('barbell')) {
      return ['Free-Weight Stabilization', 'Arms', 'Compound Focus'];
    }
    if (eq.category === 'Cardio' || nameLower.includes('airbike') || nameLower.includes('treadmill')) {
      return ['Cardiovascular', 'HIIT Conditioning', 'Caloric Burn'];
    }
    return ['Athletic Core', 'Progressive Overload'];
  };

  const filteredEquipments = INITIAL_EQUIPMENTS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="equipments" className="relative py-14 md:py-24 overflow-hidden">
      <HaikeiPolyGrid opacity={0.07} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeText="Olympic Inventory"
          badgeVariant="cyan"
          title="World-Class Training"
          highlightWord="Machinery"
          subtitle="Tour our floor equipment before stepping inside. Biomechanically calibrated for progressive overload, safety, and peak muscle isolation."
        />

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
          {/* Animated Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto w-full sm:w-auto pb-1 sm:pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors duration-200 z-10 cursor-pointer ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-equip-tab"
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl shadow-md"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search machine, brand, keyword..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#11131a] border border-slate-800 rounded-2xl focus:outline-none focus:border-red-500 text-white backdrop-blur-md transition-colors"
            />
          </div>
        </div>

        {/* Equipments Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEquipments.map((eq) => {
              const muscles = getTargetMuscles(eq);

              return (
                <motion.div
                  layout
                  key={eq.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card
                    hoverEffect
                    glass
                    className="overflow-hidden p-0 flex flex-col group border border-slate-800/90 rounded-3xl"
                  >
                    {/* Image Container with Ambient Overlay */}
                    <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                      <img
                        src={eq.imageUrl}
                        alt={eq.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 rounded-lg text-[11px] font-bold bg-black/70 text-white backdrop-blur-md border border-white/20">
                          {eq.brand}
                        </span>
                        <span className="px-3 py-1 rounded-lg text-[11px] font-medium bg-black/60 text-slate-300 backdrop-blur-md">
                          Qty: {eq.quantity}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-red-400 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-red-500/30">
                          {eq.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-300 bg-orange-950/80 border border-orange-500/30 px-3 py-1 rounded-full backdrop-blur-md">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                          {eq.status}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-heading font-extrabold text-xl text-white group-hover:text-red-400 transition-colors">
                          {eq.name}
                        </h4>
                        <p className="mt-2 text-xs font-normal text-slate-400 leading-relaxed">
                          {eq.description}
                        </p>
                      </div>

                      {/* Target Muscle Pills */}
                      <div className="mt-5 pt-4 border-t border-slate-800">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Biomechanical Target:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {muscles.map((muscle, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-850 text-slate-300 border border-slate-750"
                            >
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
