import React from 'react';
import { Dumbbell, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenFeedback: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenFeedback }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="p-2 rounded-xl bg-emerald-500 text-black font-black">
                <Dumbbell className="w-5 h-5 -rotate-45" />
              </div>
              <span className="text-xl font-black tracking-wider">
                TITAN<span className="text-emerald-400">PRO</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A high-performance training ground dedicated to strength, longevity, and unstoppable discipline. Backed by free ad-free radio streams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore Gym
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Overview & Facility
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('equipments')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Olympic Equipments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('plans')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Membership Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('timings')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Working Hours & Days
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Active Special Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Fitness Companion */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Member Perks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('workouts')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Exercise Tutorials & Form Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workouts')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  PPL & Full Body Workout Splits
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFeedback}
                  className="hover:text-emerald-400 transition-colors text-emerald-400"
                >
                  Suggestion & Complaint Box
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('member-portal')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Refer & Earn Program
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Gym Location
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Plot 42, Fitness Avenue, Near City Stadium, Amravati</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Open Mon-Sun: 05:30 AM - 10:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2026 Titan Pro Gym. Built for warriors with zero compromises.</p>
        </div>
      </div>
    </footer>
  );
};
