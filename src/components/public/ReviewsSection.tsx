import React from 'react';
import { Star, CheckCircle, MessageSquarePlus, Sparkles } from 'lucide-react';
import type { Review } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface ReviewsSectionProps {
  reviews: Review[];
  onOpenReviewModal: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenReviewModal,
}) => {
  return (
    <section id="reviews" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-normal border backdrop-blur-sm bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25 mb-3.5">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
              Member Testimonials
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Loved by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 font-extrabold">
                Dedicated Lifters
              </span>
            </h2>
            <p className="mt-3 text-sm font-normal text-slate-500 dark:text-slate-400">
              Read how our community transforms discipline, physical strength, and athletic capability.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={onOpenReviewModal}
            icon={<MessageSquarePlus className="w-4 h-4" />}
          >
            Leave a Review
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((rev) => (
            <Card key={rev.id} className="flex flex-col justify-between p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c0e14]">
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(rev.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-medium text-amber-500 ml-1.5">
                    {rev.rating.toFixed(1)}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-300 leading-relaxed italic mb-8">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-heading font-semibold text-sm text-slate-900 dark:text-white">
                    {rev.name}
                  </h4>
                  {rev.verifiedMember && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-normal text-emerald-500 mt-0.5">
                      <CheckCircle className="w-3 h-3" />
                      Verified Member
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-normal text-slate-400">{rev.date}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
