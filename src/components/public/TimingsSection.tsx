import React from 'react';
import { Clock, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { OPEN_TIMINGS } from '../../data/mockData';
import { SectionHeader } from '../common/SectionHeader';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const TimingsSection: React.FC = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[new Date().getDay()];

  return (
    <section id="timings" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Working Hours & Peak Times"
          badgeVariant="flame"
          title="Open Days &"
          highlightWord="Operating Timings"
          subtitle="Plan your workout routine with full visibility over our operating schedule and crowd peak hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Schedule Table */}
          <div className="lg:col-span-2">
            <Card className="p-0 overflow-hidden border border-slate-800 rounded-3xl bg-[#0c0e14]">
              <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-sm font-bold text-white">
                  <Calendar className="w-4 h-4 text-red-500" />
                  Weekly Operating Schedule
                </div>
                <Badge variant="flame" dot>
                  Open 7 Days a Week
                </Badge>
              </div>

              <div className="divide-y divide-slate-800/80">
                {OPEN_TIMINGS.map((item) => {
                  const isToday = item.day.toLowerCase() === todayName.toLowerCase();
                  return (
                    <div
                      key={item.day}
                      className={`p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors ${
                        isToday
                          ? 'bg-red-500/10'
                          : 'hover:bg-slate-800/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-sm ${isToday ? 'font-black text-red-400' : 'font-medium text-slate-200'} min-w-[100px]`}>
                          {item.day}
                        </span>
                        {isToday && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white shadow-sm">
                            Today
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 text-xs font-normal">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.hours}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-orange-400 text-[11px] font-medium">
                          <span className="text-slate-400 font-normal">Rush:</span>
                          <span>{item.peakHours}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Side Info Cards */}
          <div className="space-y-4">
            <Card className="p-6 rounded-3xl bg-red-950/20 border-red-500/30 shadow-lg shadow-red-500/5">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-red-500/15 text-red-400 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white">
                    Currently Open & Active
                  </h4>
                  <p className="mt-1 text-xs font-normal text-slate-300 leading-relaxed">
                    Trainers are on the floor. Locker rooms, water stations, and weights sanitized regularly throughout the day.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-3xl border border-slate-800 bg-[#0c0e14]">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-orange-500/15 text-orange-400 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white">
                    Peak Hours Advice
                  </h4>
                  <p className="mt-1 text-xs font-normal text-slate-400 leading-relaxed">
                    If you prefer a quieter gym with zero wait time on squat cages and cable stations, we recommend mornings (06:00 AM - 09:30 AM) or afternoons.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
