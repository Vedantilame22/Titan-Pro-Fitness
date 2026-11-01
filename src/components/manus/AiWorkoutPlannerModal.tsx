import React, { useState } from 'react';
import { Bot, Sparkles, CheckCircle2, Dumbbell, Zap, Clock, Flame, ArrowRight, RefreshCw } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { triggerConfetti } from '../../utils/confetti';

interface AiWorkoutPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPlan?: (planTitle: string) => void;
}

export const AiWorkoutPlannerModal: React.FC<AiWorkoutPlannerModalProps> = ({
  isOpen,
  onClose,
  onApplyPlan,
}) => {
  const [goal, setGoal] = useState<'hypertrophy' | 'strength' | 'fatloss' | 'conditioning'>('hypertrophy');
  const [days, setDays] = useState<number>(4);
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [generatedRoutine, setGeneratedRoutine] = useState<any | null>(null);

  const steps = [
    'Analyzing target muscle recovery & biomechanics...',
    'Selecting optimal compound lifts & progressive overload curve...',
    'Calculating RPE targets, rep ranges & metabolic stress intervals...',
    'Finalizing Manus autonomous periodized routine...',
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setCurrentStep(0);
    setGeneratedRoutine(null);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsGenerating(false);
          setGeneratedRoutine({
            title: goal === 'hypertrophy' 
              ? 'Manus Hypertrophy V4 Protocol' 
              : goal === 'strength' 
              ? 'Titan Power & Strength Matrix' 
              : goal === 'fatloss' 
              ? 'Metabolic Shred & Density Cycle' 
              : 'Elite Athletic Conditioning Hybrid',
            splitName: `${days}-Day Upper/Lower & Push/Pull Periodization`,
            estDuration: '65 min / session',
            weeklyVolume: `${days * 18} Total Work Sets`,
            daysList: [
              {
                day: 'Day 1: Heavy Push & Delts',
                exercises: [
                  { name: 'Barbell Incline Press', sets: '4 sets × 6-8 reps', rpe: 'RPE 8.5', rest: '2.5 min' },
                  { name: 'Plate-Loaded Flat Chest Press', sets: '3 sets × 8-10 reps', rpe: 'RPE 8', rest: '2 min' },
                  { name: 'Cable Lateral Raises (Behind Back)', sets: '4 sets × 12-15 reps', rpe: 'RPE 9 (Drop on last)', rest: '90s' },
                  { name: 'Overhead Dual Rope Tricep Extension', sets: '3 sets × 10-12 reps', rpe: 'RPE 9', rest: '90s' }
                ]
              },
              {
                day: 'Day 2: Posterior Chain & Pull Dominance',
                exercises: [
                  { name: 'Barbell Deadlift / RDL', sets: '4 sets × 5 reps', rpe: 'RPE 8', rest: '3 min' },
                  { name: 'Chest-Supported T-Bar Row', sets: '4 sets × 8-10 reps', rpe: 'RPE 8.5', rest: '2 min' },
                  { name: 'Lat Pulldown (Neutral Grip)', sets: '3 sets × 10-12 reps', rpe: 'RPE 8.5', rest: '90s' },
                  { name: 'Incline Dumbbell Bicep Curl', sets: '3 sets × 10-12 reps', rpe: 'RPE 9', rest: '90s' }
                ]
              },
              {
                day: 'Day 3: Quad & Hamstring Hypertrophy',
                exercises: [
                  { name: 'Barbell Back Squat / Hack Squat', sets: '4 sets × 6-8 reps', rpe: 'RPE 8.5', rest: '3 min' },
                  { name: 'Bulgarian Split Squats', sets: '3 sets × 10 reps/leg', rpe: 'RPE 9', rest: '2 min' },
                  { name: 'Lying Leg Curls', sets: '4 sets × 10-12 reps', rpe: 'RPE 9', rest: '90s' },
                  { name: 'Standing Calf Raises', sets: '4 sets × 15 reps', rpe: 'RPE 9.5', rest: '60s' }
                ]
              },
              {
                day: 'Day 4: Upper Body Density & Weak Points',
                exercises: [
                  { name: 'Weighted Pull-Ups / Dips Superset', sets: '3 sets × 8 reps', rpe: 'RPE 8.5', rest: '2 min' },
                  { name: 'Seated Cable Row to Sternum', sets: '3 sets × 12 reps', rpe: 'RPE 8', rest: '90s' },
                  { name: 'Dumbbell Hammer Curls', sets: '3 sets × 12 reps', rpe: 'RPE 9', rest: '75s' },
                  { name: 'Face Pulls with External Rotation', sets: '4 sets × 15 reps', rpe: 'RPE 8.5', rest: '60s' }
                ]
              }
            ].slice(0, days)
          });
          triggerConfetti();
          return prev;
        }
      });
    }, 900);
  };

  const handleAdopt = () => {
    if (generatedRoutine && onApplyPlan) {
      onApplyPlan(generatedRoutine.title);
    }
    triggerConfetti();
    alert(`🔥 "${generatedRoutine?.title}" has been assigned to your Titan Pro workout portal!`);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manus AI Workout Protocol Generator"
      subtitle="Autonomous fitness intelligence powered by Manus multi-step planning engine"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Primary Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500"
            >
              <option value="hypertrophy">Hypertrophy (Muscle Mass)</option>
              <option value="strength">Strength & Powerlifting</option>
              <option value="fatloss">Fat Loss & Definition</option>
              <option value="conditioning">Athletic Conditioning</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Days / Week
            </label>
            <div className="flex gap-1">
              {[3, 4, 5, 6].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    days === d
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm shadow-red-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {d}D
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Experience Level
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value as any)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500"
            >
              <option value="beginner">Beginner (&lt; 1 Year)</option>
              <option value="intermediate">Intermediate (1-3 Years)</option>
              <option value="advanced">Advanced (3+ Years)</option>
            </select>
          </div>
        </div>

        {/* Generate Trigger */}
        {!generatedRoutine && !isGenerating && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-red-600/15 via-orange-500/10 to-transparent border border-red-500/30 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mb-3">
              <Bot className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-base font-bold text-white mb-1">
              Ready to generate your custom split?
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
              Manus AI plans progressive overload schemes, optimal exercise sequence, and rest periods customized for your target timeline.
            </p>
            <Button
              variant="glow"
              size="md"
              onClick={handleGenerate}
              className="inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Manus AI Agent Planner</span>
            </Button>
          </div>
        )}

        {/* Autonomous Progressing Steps */}
        {isGenerating && (
          <div className="p-6 rounded-2xl bg-slate-850 border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-xs font-bold uppercase tracking-wider">Manus Agent Working in Cloud Sandbox</span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>

            <div className="space-y-2">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-2.5 rounded-xl text-xs transition-all ${
                    idx === currentStep
                      ? 'bg-red-500/20 border border-red-500/40 text-red-300 font-semibold'
                      : idx < currentStep
                      ? 'text-slate-500 line-through'
                      : 'text-slate-600'
                  }`}
                >
                  {idx < currentStep ? (
                    <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  ) : idx === currentStep ? (
                    <div className="w-4 h-4 rounded-full border-2 border-red-500 border-t-transparent animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
                  )}
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Finished Generated Split */}
        {generatedRoutine && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                  Manus Autonomous Output
                </span>
                <h4 className="font-heading text-lg font-bold text-white">
                  {generatedRoutine.title}
                </h4>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-red-400" />
                    {generatedRoutine.estDuration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    {generatedRoutine.weeklyVolume}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerate}
                className="text-xs"
              >
                Regenerate
              </Button>
            </div>

            {/* Daily Routine Cards */}
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {generatedRoutine.daysList.map((d: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60"
                >
                  <h5 className="font-heading text-xs font-bold text-white mb-2 flex items-center gap-2">
                    <Dumbbell className="w-3.5 h-3.5 text-red-400" />
                    {d.day}
                  </h5>
                  <div className="space-y-1.5">
                    {d.exercises.map((ex: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-900/80 border border-slate-800"
                      >
                        <span className="font-semibold text-slate-200">{ex.name}</span>
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="font-mono text-orange-400">{ex.sets}</span>
                          <span>•</span>
                          <span className="text-amber-400">{ex.rpe}</span>
                          <span>•</span>
                          <span>Rest {ex.rest}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" size="md" onClick={onClose}>
                Close
              </Button>
              <Button
                variant="glow"
                size="md"
                onClick={handleAdopt}
                className="inline-flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Adopt Plan to Member Portal</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
