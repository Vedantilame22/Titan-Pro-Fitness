import React, { useState } from 'react';
import { Apple, Flame, Droplet, Dumbbell, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface AiMacroNutritionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiMacroNutritionModal: React.FC<AiMacroNutritionModalProps> = ({ isOpen, onClose }) => {
  const [weightKg, setWeightKg] = useState<number>(75);
  const [goal, setGoal] = useState<'build' | 'cut' | 'maintain'>('build');
  const [activity, setActivity] = useState<'moderate' | 'high' | 'athlete'>('high');

  // Multiplier calculation
  const bmr = 10 * weightKg + 6.25 * 175 - 5 * 24 + 5;
  const activityMult = activity === 'moderate' ? 1.4 : activity === 'high' ? 1.6 : 1.85;
  const tdee = Math.round(bmr * activityMult);

  const targetCalories =
    goal === 'build' ? tdee + 350 : goal === 'cut' ? tdee - 450 : tdee;

  // Macros:
  const proteinGrams = Math.round(weightKg * 2.2);
  const proteinCals = proteinGrams * 4;

  const fatGrams = Math.round(weightKg * 0.9);
  const fatCals = fatGrams * 9;

  const carbGrams = Math.max(80, Math.round((targetCalories - proteinCals - fatCals) / 4));
  const waterLiters = (weightKg * 0.04).toFixed(1);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manus AI Precision Nutrition Planner"
      subtitle="Macro-nutrient calculation calibrated for intense gym performance"
      maxWidth="xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Weight (kg)
            </label>
            <input
              type="number"
              min="40"
              max="160"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value) || 70)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Fitness Objective
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500"
            >
              <option value="build">Lean Muscle Gain (+Surplus)</option>
              <option value="cut">Fat Shred (-Deficit)</option>
              <option value="maintain">Body Recomposition</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Training Volume
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as any)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500"
            >
              <option value="moderate">3-4 sessions / week</option>
              <option value="high">5-6 intense sessions</option>
              <option value="athlete">Double Days / Elite Athlete</option>
            </select>
          </div>
        </div>

        {/* Big Target Output Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-red-600/20 via-orange-500/15 to-rose-600/20 border border-red-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
              Optimal Target Daily Energy
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                {targetCalories.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-slate-400">kcal / day</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
              Hydration Baseline
            </span>
            <div className="flex items-center gap-1.5 justify-end text-orange-400 font-bold text-lg font-heading">
              <Droplet className="w-4 h-4 text-orange-400" />
              <span>{waterLiters} Liters</span>
            </div>
          </div>
        </div>

        {/* 3 Macro Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-center">
            <div className="w-8 h-8 mx-auto rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center mb-1.5">
              <Dumbbell className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Protein</span>
            <span className="font-heading text-xl font-extrabold text-red-400">{proteinGrams}g</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{proteinCals} kcal</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-center">
            <div className="w-8 h-8 mx-auto rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center mb-1.5">
              <Flame className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Carbohydrates</span>
            <span className="font-heading text-xl font-extrabold text-orange-400">{carbGrams}g</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{carbGrams * 4} kcal</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-center">
            <div className="w-8 h-8 mx-auto rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-1.5">
              <Apple className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Healthy Fats</span>
            <span className="font-heading text-xl font-extrabold text-amber-400">{fatGrams}g</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{fatCals} kcal</span>
          </div>
        </div>

        {/* Timing Recommendations */}
        <div className="p-4 rounded-xl bg-slate-850/60 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-200 font-medium">
            <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span><strong>Pre-Workout (60-90m prior):</strong> 35-50g fast carbs + 25g whey/egg whites for glycogen replenishment.</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200 font-medium">
            <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span><strong>Post-Workout Window:</strong> 40g high-leucine protein + 60g carbs to stimulate maximum Muscle Protein Synthesis (MPS).</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="glow" size="md" onClick={onClose}>
            Done & Save Target
          </Button>
        </div>
      </div>
    </Modal>
  );
};
