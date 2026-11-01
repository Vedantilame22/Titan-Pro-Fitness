import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Receipt,
  PlayCircle,
  MessageSquare,
  Zap,
  Bot,
  Apple,
  Sparkles,
  ShieldCheck,
  Dumbbell,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_PAYMENTS, INITIAL_PLANS } from '../../data/mockData';
import { RenewalAlertBanner } from './RenewalAlertBanner';
import { ReferAndEarnCard } from './ReferAndEarnCard';
import { PaymentHistoryModal } from './PaymentHistoryModal';
import { ExerciseTutorialsModal } from './ExerciseTutorialsModal';
import { AiWorkoutPlannerModal } from '../manus/AiWorkoutPlannerModal';
import { AiMacroNutritionModal } from '../manus/AiMacroNutritionModal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { triggerConfetti } from '../../utils/confetti';
import { HaikeiMeshGlow } from '../haikei/HaikeiMeshGlow';

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
  const [showAiPlanner, setShowAiPlanner] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  if (!currentUser) return null;

  const handleQuickRenew = (months: number, planTitle: string) => {
    renewCurrentMember(months, planTitle);
    setShowRenewModal(false);
    triggerConfetti();
    alert(`🔥 Membership successfully renewed for ${months} months under ${planTitle}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Member Header Card with Crimson Aura */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        <HaikeiMeshGlow variant="crimson" className="opacity-70" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-orange-500 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-red-600/35"
            >
              {currentUser.name.charAt(0)}
            </motion.div>

            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-heading text-2xl font-bold text-white">{currentUser.name}</h2>
                <Badge variant="neon">Active Athlete Pass</Badge>
              </div>
              <p className="text-xs font-normal text-slate-400 mt-1">
                {currentUser.phone} • Member Pass: #{currentUser.id}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-normal text-slate-300">
                  Current Tier: <span className="font-bold text-orange-400">{currentUser.planName}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Digital Member Pass Verification Badge */}
          <div className="flex items-center gap-3.5 bg-black/50 border border-slate-800 p-3.5 rounded-2xl backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-mono font-bold text-xs border border-red-500/40">
              PASS
            </div>
            <div className="text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                RFID Gate Status
              </span>
              <span className="text-red-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Floor Access Granted
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Renewal Alert Banner */}
      <RenewalAlertBanner
        user={currentUser}
        onRenewClick={() => setShowRenewModal(true)}
      />

      {/* Manus AI Intelligence Actions Bar */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-red-600/10 via-orange-500/10 to-rose-600/10 border border-red-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-orange-500 text-white flex items-center justify-center font-black shadow-md shadow-red-600/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                Manus AI Fitness Co-Pilot
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500/20 text-red-400">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Autonomous routine periodization & macro-nutrient calculations tailored to your biometric target.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAiPlanner(true)}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            Launch AI Workout Planner
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNutrition(true)}
            icon={<Apple className="w-3.5 h-3.5 text-orange-400" />}
          >
            Macro Target
          </Button>
        </div>
      </div>

      {/* Quick Access Action Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.button
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowTutorials(true)}
          className="p-5 rounded-3xl bg-[#0c0e14] border border-slate-800 hover:border-red-500/40 transition-colors text-left group shadow-sm cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <PlayCircle className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-sm font-bold text-white">
            Exercise Tutorials
          </h4>
          <p className="text-[11px] font-normal text-slate-400 mt-1">Form breakdowns & videos</p>
        </motion.button>

        <motion.button
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowPayments(true)}
          className="p-5 rounded-3xl bg-[#0c0e14] border border-slate-800 hover:border-orange-500/40 transition-colors text-left group shadow-sm cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Receipt className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-sm font-bold text-white">
            Payment History
          </h4>
          <p className="text-[11px] font-normal text-slate-400 mt-1">Invoices & receipts</p>
        </motion.button>

        <motion.button
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenFeedback}
          className="p-5 rounded-3xl bg-[#0c0e14] border border-slate-800 hover:border-red-500/40 transition-colors text-left group shadow-sm cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-sm font-bold text-white">
            Suggestions Box
          </h4>
          <p className="text-[11px] font-normal text-slate-400 mt-1">Request gear or report issues</p>
        </motion.button>

        <motion.button
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowRenewModal(true)}
          className="p-5 rounded-3xl bg-[#0c0e14] border border-slate-800 hover:border-orange-500/40 transition-colors text-left group shadow-sm cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-sm font-bold text-white">
            Renew Membership
          </h4>
          <p className="text-[11px] font-normal text-slate-400 mt-1">Lock in seasonal discount</p>
        </motion.button>
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

      <AiWorkoutPlannerModal
        isOpen={showAiPlanner}
        onClose={() => setShowAiPlanner(false)}
      />

      <AiMacroNutritionModal
        isOpen={showNutrition}
        onClose={() => setShowNutrition(false)}
      />

      {/* Quick Renew Modal */}
      <Modal
        isOpen={showRenewModal}
        onClose={() => setShowRenewModal(false)}
        title="Renew Your Titan Membership"
        subtitle="Select your desired duration to extend your gym pass instantly."
        maxWidth="md"
      >
        <div className="space-y-3">
          {INITIAL_PLANS.map((p) => (
            <div
              key={p.id}
              onClick={() => handleQuickRenew(p.durationMonths, p.title)}
              className="p-4 rounded-2xl border border-slate-800 hover:border-red-500/60 cursor-pointer transition-all flex items-center justify-between hover:bg-red-500/5"
            >
              <div>
                <h5 className="font-heading font-bold text-sm text-white">
                  {p.title}
                </h5>
                <p className="text-[11px] text-slate-400">{p.durationMonths} Months Duration</p>
              </div>
              <span className="font-heading font-extrabold text-orange-400">
                ₹{p.price.toLocaleString('en-IN')}
              </span>
            </div>
          ))}

          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowRenewModal(false)}
            className="w-full mt-3"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};
