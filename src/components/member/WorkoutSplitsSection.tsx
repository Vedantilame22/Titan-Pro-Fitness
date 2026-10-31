import React, { useState } from 'react';
import { Dumbbell, Calendar, Target, PlayCircle, Zap } from 'lucide-react';
import type { WorkoutSchedule } from '../../types';
import { WORKOUT_SCHEDULES } from '../../data/mockData';
import { SectionHeader } from '../common/SectionHeader';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface WorkoutSplitsSectionProps {
  onSelectExercise: (exerciseName: string) => void;
}

export const WorkoutSplitsSection: React.FC<WorkoutSplitsSectionProps> = ({
  onSelectExercise,
}) => {
  const [selectedSplitId, setSelectedSplitId] = useState<string>(WORKOUT_SCHEDULES[0].id);

  const activeSplit =
    WORKOUT_SCHEDULES.find((s) => s.id === selectedSplitId) || WORKOUT_SCHEDULES[0];

  return (
    <section id="workouts" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Free Member Resource"
          badgeVariant="neon"
          title="Curated Workout"
          highlightWord="Schedules & Splits"
          subtitle="Stop guessing your exercises. Follow tested routines engineered for progressive overload and balanced muscular development."
        />

        {/* Split Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10 overflow-x-auto pb-2">
          {WORKOUT_SCHEDULES.map((split) => (
            <button
              key={split.id}
              onClick={() => setSelectedSplitId(split.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-normal flex items-center gap-2.5 transition-all cursor-pointer ${
                selectedSplitId === split.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-medium shadow-md'
                  : 'bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500/50'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span>{split.splitName}</span>
              <span
                className={`text-[10px] font-normal px-2 py-0.5 rounded-full ${
                  selectedSplitId === split.id
                    ? 'bg-black text-emerald-400 dark:bg-slate-200 dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {split.daysPerWeek} Days/Wk
              </span>
            </button>
          ))}
        </div>

        {/* Split Details Banner */}
        <div className="max-w-4xl mx-auto mb-10 p-5 rounded-3xl bg-slate-50 dark:bg-[#0c0e14] border border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-normal">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-500">Goal:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {activeSplit.goal}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-slate-500">Level:</span>
            <Badge variant="amber">{activeSplit.level}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-500" />
            <span className="text-slate-500">Frequency:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {activeSplit.daysPerWeek} Days Weekly
            </span>
          </div>
        </div>

        {/* Daily Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {activeSplit.schedule.map((dayPlan, index) => (
            <Card key={index} className="flex flex-col justify-between p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c0e14]">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                    {dayPlan.day}
                  </h4>
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                    Day {index + 1}
                  </span>
                </div>

                <p className="text-xs font-normal text-emerald-500 mb-4">
                  Focus: {dayPlan.focus}
                </p>

                <div className="space-y-2">
                  {dayPlan.exercises.map((exName, exIdx) => (
                    <div
                      key={exIdx}
                      onClick={() => onSelectExercise(exName)}
                      className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 transition-all cursor-pointer text-xs"
                    >
                      <span className="font-normal text-slate-700 dark:text-slate-300 group-hover:text-emerald-400 transition-colors">
                        {exName}
                      </span>
                      <PlayCircle className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-normal text-slate-400 text-center">
                Click any movement for form video & tips
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
