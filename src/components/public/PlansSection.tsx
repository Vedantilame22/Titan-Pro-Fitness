import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import type { MembershipPlan } from '../../types';
import { INITIAL_PLANS } from '../../data/mockData';
import { SectionHeader } from '../common/SectionHeader';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { HaikeiMeshGlow } from '../haikei/HaikeiMeshGlow';

interface PlansSectionProps {
  onSelectPlan: (plan: MembershipPlan) => void;
}

export const PlansSection: React.FC<PlansSectionProps> = ({ onSelectPlan }) => {
  const [filterDuration, setFilterDuration] = useState<'all' | '1' | '3' | '12'>('all');

  const filteredPlans = INITIAL_PLANS.filter((plan) => {
    if (filterDuration === 'all') return true;
    return plan.durationMonths.toString() === filterDuration;
  });

  return (
    <section id="plans" className="relative py-16 md:py-28 overflow-hidden">
      <HaikeiMeshGlow variant="flame" className="opacity-45" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeText="Fair & Transparent Pricing"
          badgeVariant="amber"
          title="Choose Your"
          highlightWord="Membership"
          subtitle="Zero hidden registration fees. Zero predatory contracts. Every membership tier includes 24/7 ad-free radio, master workout splits, and locker access."
        />

        {/* Animated Frequency Selector with Red/Flame Pill */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md backdrop-blur-md">
            {[
              { id: 'all', label: 'All Plans' },
              { id: '1', label: '1 Month' },
              { id: '3', label: '3 Months (Popular)' },
              { id: '12', label: '12 Months (Best Value)' },
            ].map((tab) => {
              const isActive = filterDuration === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterDuration(tab.id as any)}
                  className={`relative px-4 py-2 text-xs font-bold rounded-xl transition-colors duration-200 z-10 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pricing-pill"
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl shadow-md shadow-red-600/30"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Plans Grid with Motion */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredPlans.map((plan) => {
              const isPopular = plan.popular;
              const monthlyEquivalent = Math.round(plan.price / plan.durationMonths);

              return (
                <motion.div
                  layout
                  key={plan.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="flex"
                >
                  <Card
                    hoverEffect
                    glass
                    className={`relative flex flex-col justify-between w-full p-8 rounded-3xl transition-all ${
                      isPopular
                        ? 'border-2 border-red-500/90 shadow-2xl shadow-red-600/20 md:-translate-y-2'
                        : 'border-slate-800/90'
                    }`}
                  >
                    {/* Popular ribbon */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 text-white shadow-lg shadow-red-600/40 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 fill-white" />
                          Most Popular Tier
                        </span>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-heading font-extrabold text-2xl text-white">
                          {plan.title}
                        </h3>
                        <Badge variant={isPopular ? 'neon' : 'slate'}>
                          {plan.durationMonths} {plan.durationMonths === 1 ? 'Month' : 'Months'}
                        </Badge>
                      </div>

                      <p className="text-xs font-normal text-slate-400 mb-6 leading-relaxed">
                        {plan.description}
                      </p>

                      {/* Pricing Display */}
                      <div className="p-5 rounded-2xl bg-[#090b10] border border-slate-800 mb-6">
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-bold text-slate-400">₹</span>
                          <span className="font-heading text-4xl sm:text-5xl font-black text-white">
                            {plan.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs font-medium text-slate-400 ml-1">
                            / {plan.durationMonths === 1 ? 'month' : `${plan.durationMonths} months`}
                          </span>
                        </div>

                        {plan.durationMonths > 1 && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs font-bold text-red-400">
                              ₹{monthlyEquivalent.toLocaleString('en-IN')} / month
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-500/15 text-red-400 border border-red-500/30">
                              Save {plan.durationMonths === 12 ? '35%' : '15%'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Features list */}
                      <div className="space-y-3 mb-8">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Included Privileges:
                        </p>
                        {plan.features.map((feat, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 text-xs sm:text-sm font-medium text-slate-300"
                          >
                            <div className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                            </div>
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant={isPopular ? 'glow' : 'outline'}
                      size="lg"
                      onClick={() => onSelectPlan(plan)}
                      icon={<ArrowRight className="w-4 h-4" />}
                      className="w-full mt-4"
                    >
                      Enroll in {plan.title}
                    </Button>
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
