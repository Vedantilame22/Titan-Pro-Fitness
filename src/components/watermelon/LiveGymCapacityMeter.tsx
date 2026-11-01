import React, { useState } from 'react';
import { Users, Clock, Flame, Shield, ChevronRight } from 'lucide-react';

export const LiveGymCapacityMeter: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<'all' | 'free-weights' | 'cardio' | 'functional'>('all');

  const zones = {
    all: { count: 38, max: 120, label: '32% • Optimal Workout Flow', color: 'red' },
    'free-weights': { count: 18, max: 40, label: '45% • Moderate Activity', color: 'red' },
    cardio: { count: 12, max: 45, label: '27% • Ample Treadmills Free', color: 'red' },
    functional: { count: 8, max: 35, label: '23% • Turf & Racks Open', color: 'red' },
  };

  const current = zones[selectedZone];
  const percent = Math.round((current.count / current.max) * 100);

  const hoursData = [
    { time: '6 AM', busy: 45 },
    { time: '8 AM', busy: 85, peak: true },
    { time: '11 AM', busy: 35 },
    { time: '2 PM', busy: 20 },
    { time: '5 PM', busy: 65 },
    { time: '7 PM', busy: 95, peak: true },
    { time: '9 PM', busy: 50 },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-[#0f1118]/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                  Live Floor Radar
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  LIVE
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Floor Occupancy & Peak Flow
              </h3>
            </div>
          </div>

          {/* Zone Selector Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            {(['all', 'free-weights', 'cardio', 'functional'] as const).map((z) => (
              <button
                key={z}
                onClick={() => setSelectedZone(z)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-all ${
                  selectedZone === z
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {z === 'all' ? 'Entire Floor' : z.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Meter Bar */}
        <div className="p-5 rounded-2xl bg-slate-850/60 border border-slate-800 mb-6">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-black text-white">
                  {current.count}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  / {current.max} athletes on floor
                </span>
              </div>
              <span className="text-xs font-bold text-red-400">{current.label}</span>
            </div>
            <span className="font-heading text-2xl font-black text-red-500">{percent}%</span>
          </div>

          {/* Segmented bar */}
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 transition-all duration-700 ease-out shadow-sm shadow-red-500/50"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Peak Hours visualizer */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-3">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Typical Traffic Trend (Today)
            </span>
            <span className="text-[11px] text-orange-400 font-bold">7 PM is Prime Peak</span>
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-20 pt-2 px-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            {hoursData.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                <div
                  className={`w-full max-w-[28px] rounded-t-md transition-all group-hover:opacity-100 ${
                    h.peak
                      ? 'bg-gradient-to-t from-red-600 to-orange-500 opacity-90'
                      : 'bg-red-500/40 opacity-70'
                  }`}
                  style={{ height: `${h.busy}%` }}
                />
                <span className="text-[10px] font-medium text-slate-400">
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Floor Metrics */}
        <div className="mt-5 grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center">
          <div className="p-2 rounded-xl bg-slate-900/60">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Climate</span>
            <span className="text-xs font-bold text-slate-200">20.5°C Chilled</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Airflow</span>
            <span className="text-xs font-bold text-rose-400">HEPA-Filtered (AQI 18)</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Sound Aura</span>
            <span className="text-xs font-bold text-orange-400">128 BPM Techno</span>
          </div>
        </div>
      </div>
    </div>
  );
};
