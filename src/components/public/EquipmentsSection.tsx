import React, { useState } from 'react';
import { Search, CheckCircle2 } from 'lucide-react';
import type { Equipment } from '../../types';
import { INITIAL_EQUIPMENTS } from '../../data/mockData';
import { SectionHeader } from '../common/SectionHeader';
import { Card } from '../common/Card';

export const EquipmentsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Free Weights', 'Machines', 'Cardio', 'Functional'];

  const filteredEquipments = INITIAL_EQUIPMENTS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="equipments" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Olympic Inventory"
          badgeVariant="cyan"
          title="World-Class Training"
          highlightWord="Machinery"
          subtitle="Tour our floor equipment before stepping inside. Biomechanically calibrated for progressive overload, safety, and peak muscle isolation."
        />

        {/* Filter and Search Bar with Breathable Spacing */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
          {/* Minimalist Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-normal whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-medium shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Elegant Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gear, brand, or machine..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-[#11131a] border border-slate-200 dark:border-slate-800 rounded-full focus:outline-none focus:border-emerald-500 dark:text-white transition-colors"
            />
          </div>
        </div>

        {/* Equipments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEquipments.map((eq) => (
            <Card key={eq.id} className="overflow-hidden p-0 flex flex-col group border border-slate-200 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-[#0f1118]">
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={eq.imageUrl}
                  alt={eq.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 flex gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/60 text-white backdrop-blur-md border border-white/15">
                    {eq.brand}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-normal bg-black/50 text-slate-300 backdrop-blur-md">
                    Qty: {eq.quantity}
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="text-[11px] font-normal text-emerald-400 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {eq.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-normal text-emerald-300 bg-emerald-950/70 border border-emerald-600/30 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {eq.status}
                  </span>
                </div>
              </div>

              {/* Card Content - Regular / normal body typography */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {eq.name}
                  </h3>
                  <p className="mt-2.5 text-xs font-normal text-slate-500 dark:text-slate-400 leading-relaxed">
                    {eq.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-normal text-slate-400">
                  <span>Sanitized after every shift</span>
                  <span className="text-emerald-500">Zero Wait Queue</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
