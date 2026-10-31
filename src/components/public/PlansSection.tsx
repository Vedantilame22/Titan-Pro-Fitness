import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import type { MembershipPlan } from '../../types';
import { INITIAL_PLANS } from '../../data/mockData';
import { SectionHeader } from '../common/SectionHeader';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface PlansSectionProps {
  onSelectPlan: (plan: MembershipPlan) => void;
}

export const PlansSection: React.FC<PlansSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="plans" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Fair & Transparent Pricing"
          badgeVariant="amber"
          title="Choose Your"
          highlightWord="Membership"
          subtitle="No hidden registration fees. No lock-in contracts. Every membership tier includes full access to free ad-free gym radio and exercise splits."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {INITIAL_PLANS.map((plan) => {
            const isPopular = plan.popular;
            const monthlyEquivalent = Math.round(plan.price / plan.durationMonths);

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 dark:bg-[#0f121a] md:-translate-y-2'
                    : 'border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c0e14]'
                }`}
              >
                {/* Popular ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-emerald-500 text-black shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 fill-black" />
                      Most Popular Plan
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                      {plan.title}
                    </h3>
                    <Badge variant={isPopular ? 'neon' : 'slate'}>
                      {plan.durationMonths} {plan.durationMonths === 1 ? 'Month' : 'Months'}
                    </Badge>
                  </div>

                  <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Pricing Display */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#08090d] border border-slate-100 dark:border-slate-800/60 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-medium text-slate-400">₹</span>
                      <span className="font-heading text-4xl font-bold text-slate-900 dark:text-white">
                        {plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-normal text-slate-400 ml-1">
                        / {plan.durationMonths === 1 ? 'month' : `${plan.durationMonths} months`}
                      </span>
                    </div>

                    {plan.durationMonths > 1 && (
                      <p className="mt-1 text-xs font-medium text-emerald-500">
                        Effective ₹{monthlyEquivalent.toLocaleString('en-IN')} / month
                      </p>
                    )}
                  </div>

                  {/* Features list - Clean normal weight */}
                  <div className="space-y-3 mb-8">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      Included with Membership:
                    </p>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant={isPopular ? 'primary' : 'outline'}
                  size="md"
                  onClick={() => onSelectPlan(plan)}
                  className="w-full"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Join with {plan.title}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
