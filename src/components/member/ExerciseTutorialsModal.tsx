import React, { useState } from 'react';
import { Play, Search, AlertCircle, CheckCircle2, Dumbbell, X } from 'lucide-react';
import type { Exercise } from '../../types';
import { EXERCISE_TUTORIALS } from '../../data/mockData';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

interface ExerciseTutorialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExerciseName?: string;
}

export const ExerciseTutorialsModal: React.FC<ExerciseTutorialsModalProps> = ({
  isOpen,
  onClose,
  initialExerciseName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState(initialExerciseName || '');
  const [activeExercise, setActiveExercise] = useState<Exercise>(EXERCISE_TUTORIALS[0]);

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

  const filtered = EXERCISE_TUTORIALS.filter((ex) => {
    const matchesCat = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchesSearch =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Exercise Tutorial & Proper Form Library"
      subtitle="Free biomechanics & form breakdowns to build strength safely without joint injuries."
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercise..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
            />
          </div>
        </div>

        {/* Selected Exercise Main Video & Breakdown */}
        {activeExercise && (
          <div className="rounded-2xl border border-emerald-500/30 overflow-hidden bg-slate-50 dark:bg-[#0d0f17]">
            {/* YouTube Video Embed */}
            <div className="relative aspect-video w-full bg-black">
              {activeExercise.videoUrl ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeExercise.videoUrl}?rel=0&modestbranding=1`}
                  title={activeExercise.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                  Video Tutorial Loading...
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeExercise.title}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="neon">{activeExercise.category}</Badge>
                  <Badge variant="amber">{activeExercise.difficulty}</Badge>
                </div>
              </div>

              <div className="mb-4 text-xs">
                <span className="font-semibold text-slate-500 dark:text-slate-400">Target Muscles: </span>
                <span className="font-bold text-emerald-500">{activeExercise.targetMuscle}</span>
              </div>

              {/* Instructions */}
              <div className="space-y-2 mb-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Step-by-Step Execution:
                </h5>
                <ol className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeExercise.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Form Tips Box */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-700 dark:text-amber-300">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" />
                <div>
                  <span className="font-bold">Pro Form Tip: </span>
                  {activeExercise.tips}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Exercise List Pill Bar */}
        <div>
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Other Exercises to Learn ({filtered.length}):
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {filtered.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setActiveExercise(ex)}
                className={`p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between border ${
                  activeExercise.id === ex.id
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold'
                    : 'bg-white dark:bg-[#12141c] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
                }`}
              >
                <div className="truncate mr-2">
                  <p className="truncate font-semibold">{ex.title}</p>
                  <p className="text-[10px] text-slate-400">{ex.category} • {ex.difficulty}</p>
                </div>
                <Play className="w-3.5 h-3.5 flex-shrink-0 text-emerald-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
