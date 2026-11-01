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
          badgeVariant="flame"
          title="Exclusive Special"
          highlightWord="Discounts"
          subtitle="Grab seasonal promo codes to lock in your membership rate before enrollment caps out."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {INITIAL_OFFERS.map((offer) => (
            <Card
              key={offer.id}
              className="relative overflow-hidden border border-dashed border-red-500/40 bg-[#0c0e14] p-8 rounded-3xl flex flex-col justify-between shadow-xl shadow-red-500/5"
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
                  <span className="font-heading text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                    {offer.discountPercentage}% OFF
                  </span>
                  <span className="font-heading text-lg font-bold text-white">
                    {offer.title}
                  </span>
                </div>

                <p className="text-xs font-normal text-slate-400 leading-relaxed mb-8">
                  {offer.description}
                </p>
              </div>

              {/* Coupon Code Strip */}
              <div className="p-3.5 rounded-2xl bg-black/50 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Discount Voucher
                  </span>
                  <span className="font-mono text-sm font-extrabold text-orange-400 tracking-wider">
                    {offer.code}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(offer.code)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-orange-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
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
