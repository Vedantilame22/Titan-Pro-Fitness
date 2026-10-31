import React, { useState } from 'react';
import {
  Receipt,
  PlayCircle,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_PAYMENTS, INITIAL_PLANS } from '../../data/mockData';
import { RenewalAlertBanner } from './RenewalAlertBanner';
import { ReferAndEarnCard } from './ReferAndEarnCard';
import { PaymentHistoryModal } from './PaymentHistoryModal';
import { ExerciseTutorialsModal } from './ExerciseTutorialsModal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { triggerConfetti } from '../../utils/confetti';

interface MemberDashboardProps {
  onOpenFeedback: () => void;
  onSelectExercise: (name: string) => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({
  onOpenFeedback,
}) => {
  const { currentUser, renewCurrentMember } = useAuth();
  const [showPayments, setShowPayments] = useState(false);
  const [showTutorials, setShowTutorials] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);

  if (!currentUser) return null;

  const handleQuickRenew = (months: number, planTitle: string) => {
    renewCurrentMember(months, planTitle);
    setShowRenewModal(false);
    triggerConfetti();
    alert(`🎉 Membership successfully renewed for ${months} months under ${planTitle}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Member Header Card */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black font-black text-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              {currentUser.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-heading text-2xl font-bold text-white">{currentUser.name}</h2>
                <Badge variant="neon">Active Member</Badge>
              </div>
              <p className="text-xs font-normal text-slate-400 mt-1">
                {currentUser.phone} • Member Pass: #{currentUser.id}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-normal text-slate-300">
                  Current Plan: <span className="font-medium text-emerald-400">{currentUser.planName}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Digital Member Pass Badge */}
          <div className="flex items-center gap-3.5 bg-black/40 border border-slate-800 p-3.5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs border border-emerald-500/30">
              PASS
            </div>
            <div className="text-xs">
              <span className="text-[10px] uppercase font-normal text-slate-400 block tracking-wider">
                Access Verification
              </span>
              <span className="text-emerald-400 font-medium">Floor Access Granted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Renewal Alert Banner */}
      <RenewalAlertBanner
        user={currentUser}
        onRenewClick={() => setShowRenewModal(true)}
      />

      {/* Quick Access Action Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setShowTutorials(true)}
          className="p-5 rounded-2xl bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all text-left group shadow-sm cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <PlayCircle className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
            Exercise Tutorials
          </h4>
          <p className="text-[11px] font-normal text-slate-400 mt-1">Form breakdowns & videos</p>
        </button>

        <button
          onClick={() => setShowPayments(true)}
          className="p-5 rounded-2xl bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all text-left group shadow-sm cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Receipt className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
            Payment History
          </h4>
          <p className="text-[11px] font-normal text-slate-400 mt-1">Invoices & receipts</p>
        </button>

        <button
          onClick={onOpenFeedback}
          className="p-5 rounded-2xl bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all text-left group shadow-sm cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
            Suggestions Box
          </h4>
          <p className="text-[11px] font-normal text-slate-400 mt-1">Request gear or report issues</p>
        </button>

        <button
          onClick={() => setShowRenewModal(true)}
          className="p-5 rounded-2xl bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all text-left group shadow-sm cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
            Renew Membership
          </h4>
          <p className="text-[11px] font-normal text-slate-400 mt-1">Lock in seasonal discount</p>
        </button>
      </div>

      {/* Refer and Earn Program */}
      <ReferAndEarnCard
        referralCode={currentUser.referralCode || 'TITAN20'}
        referralCount={currentUser.referralCount || 0}
      />

      {/* Modals */}
      <PaymentHistoryModal
        isOpen={showPayments}
        onClose={() => setShowPayments(false)}
        payments={INITIAL_PAYMENTS}
      />

      <ExerciseTutorialsModal
        isOpen={showTutorials}
        onClose={() => setShowTutorials(false)}
      />

      {/* Quick Renew Modal */}
      {showRenewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-1.5">
              Renew Your Titan Membership
            </h3>
            <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mb-6">
              Select your desired duration to extend your gym access instantly.
            </p>

            <div className="space-y-3 mb-6">
              {INITIAL_PLANS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleQuickRenew(p.durationMonths, p.title)}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500/60 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-heading font-medium text-sm text-slate-900 dark:text-white">
                      {p.title}
                    </h5>
                    <p className="text-[11px] font-normal text-slate-400">{p.durationMonths} Months Duration</p>
                  </div>
                  <span className="font-heading font-bold text-emerald-500">₹{p.price}</span>
                </div>
              ))}
            </div>

            <Button
              variant="secondary"
              size="md"
              onClick={() => setShowRenewModal(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
