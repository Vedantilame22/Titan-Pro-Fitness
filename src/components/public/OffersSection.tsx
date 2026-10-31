import React, { useState } from 'react';
import { Copy, Check, Clock } from 'lucide-react';
import { INITIAL_OFFERS } from '../../data/mockData';
import { SectionHeader } from '../common/SectionHeader';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const OffersSection: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Limited Time Promo"
          badgeVariant="amber"
          title="Exclusive Special"
          highlightWord="Discounts"
          subtitle="Grab seasonal promo codes to lock in your membership rate before enrollment caps out."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {INITIAL_OFFERS.map((offer) => (
            <Card
              key={offer.id}
              className="relative overflow-hidden border border-dashed border-emerald-500/40 dark:bg-[#0c0e14] p-8 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="amber" dot>
                    {offer.badge}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-[11px] font-normal text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Valid until {offer.validUntil}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2.5 mb-2.5">
                  <span className="font-heading text-3xl font-extrabold text-emerald-500">
                    {offer.discountPercentage}% OFF
                  </span>
                  <span className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                    {offer.title}
                  </span>
                </div>

                <p className="text-xs font-normal text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                  {offer.description}
                </p>
              </div>

              {/* Coupon Code Strip */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-normal text-slate-400 block tracking-wider">
                    Coupon Code
                  </span>
                  <span className="font-mono text-base font-bold text-slate-900 dark:text-emerald-400 tracking-wider">
                    {offer.code}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(offer.code)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    copiedCode === offer.code
                      ? 'bg-emerald-500 text-black'
                      : 'bg-slate-200/80 dark:bg-slate-800 hover:bg-emerald-500 hover:text-black text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
