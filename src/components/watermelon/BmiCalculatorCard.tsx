import React, { useState } from 'react';
import { Activity, Flame, Dumbbell, ArrowRight } from 'lucide-react';

export const BmiCalculatorCard: React.FC<{ onExplorePlans?: () => void }> = ({ onExplorePlans }) => {
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(178);

  const heightInMeters = height / 100;
  const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(1);

  let category = { label: 'Normal / Athletic', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30', reco: 'Hypertrophy & Lean Bulk' };
  if (bmi < 18.5) {
    category = { label: 'Underweight', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30', reco: 'High-Calorie Mass Gainer Routine' };
  } else if (bmi >= 25 && bmi < 29.9) {
    category = { label: 'Overweight / Bulking', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', reco: 'Recomposition & HIIT Conditioning' };
  } else if (bmi >= 30) {
    category = { label: 'Obese', color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/30', reco: 'Targeted Fat Loss & Metabolic Reset' };
  }

  // Est. Daily calorie expenditure
  const estCalories = Math.round(10 * weight + 6.25 * height - 5 * 25 + 500);

  return (
    <div className="relative group overflow-hidden rounded-3xl p-6 sm:p-8 bg-[#0f1118]/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-52 h-52 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                Performance Lab
              </span>
              <h3 className="font-heading text-lg font-bold text-white">
                Instant Fitness & BMI Radar
              </h3>
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-300">
            Real-time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sliders */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-400">Body Weight</span>
                <span className="text-red-400 font-bold">{weight} kg</span>
              </div>
              <input
                type="range"
                min="40"
                max="160"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>40 kg</span>
                <span>100 kg</span>
                <span>160 kg</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-400">Height</span>
                <span className="text-red-400 font-bold">{height} cm</span>
              </div>
              <input
                type="range"
                min="130"
                max="220"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>130 cm</span>
                <span>175 cm</span>
                <span>220 cm</span>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="flex flex-col justify-between p-5 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Your Calculated BMI</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                    {bmi}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${category.bg} ${category.color}`}>
                    {category.label}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Est. Daily Intake</span>
                </div>
                <span className="font-heading text-lg font-bold text-orange-400">
                  ~{estCalories} kcal
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <Dumbbell className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-slate-300 font-medium truncate max-w-[200px]">
                  {category.reco}
                </span>
              </div>
              {onExplorePlans && (
                <button
                  onClick={onExplorePlans}
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-orange-400 transition-colors cursor-pointer"
                >
                  <span>Explore Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
