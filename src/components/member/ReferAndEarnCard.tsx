import React, { useState } from 'react';
import { Gift, Copy, Check, Share2, Users, Sparkles } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { triggerConfetti } from '../../utils/confetti';

interface ReferAndEarnCardProps {
  referralCode: string;
  referralCount: number;
}

export const ReferAndEarnCard: React.FC<ReferAndEarnCardProps> = ({
  referralCode,
  referralCount,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Join Titan Pro Gym with my code ${referralCode} and get 20% off your membership! https://titanfitness.com?ref=${referralCode}`
    );
    setCopied(true);
    triggerConfetti();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hey! Come work out with me at Titan Pro Gym. Use my referral code *${referralCode}* to get 20% OFF! https://titanfitness.com?ref=${referralCode}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const totalReward = referralCount * 150; // ₹150 discount per friend

  return (
    <Card className="relative overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Info */}
        <div className="space-y-2 max-w-md">
          <Badge variant="neon" dot>
            Refer & Earn Program
          </Badge>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Lift Together, <span className="text-emerald-500">Save Together</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Give your workout buddy 20% off. When they join, you automatically receive ₹150 renewal credit added to your account!
          </p>

          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Users className="w-4 h-4 text-emerald-500" />
              <span>{referralCount} Friends Joined</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
              <Sparkles className="w-4 h-4" />
              <span>₹{totalReward} Earned in Credits</span>
            </div>
          </div>
        </div>

        {/* Action Box */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch gap-3">
          <div className="p-3 bg-white dark:bg-black/60 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Your Referral Code
              </span>
              <span className="font-mono text-lg font-black text-emerald-500">
                {referralCode}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                copied
                  ? 'bg-emerald-500 text-black'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-black text-slate-700 dark:text-slate-200'
              }`}
              title="Copy Referral Link"
            >
              {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <button
            onClick={handleWhatsAppShare}
            className="px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-2xl shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </button>
        </div>
      </div>
    </Card>
  );
};
