import React, { useState } from 'react';
import {
  Dumbbell,
  Sun,
  Moon,
  MessageSquare,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Radio,
  ChevronDown,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';

interface NavbarProps {
  onOpenFeedback: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenFeedback,
  activeTab,
  setActiveTab,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, isAdmin, isMember, loginAsAdmin, loginAsMember, logout } = useAuth();
  const { isPlaying, togglePlay, currentTrack } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Clean, single-word labels that NEVER wrap into awkward 2-line text
  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'equipments', label: 'Equipments' },
    { id: 'plans', label: 'Plans' },
    { id: 'timings', label: 'Timings' },
    { id: 'offers', label: 'Offers' },
    { id: 'workouts', label: 'Workouts' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#08090d]/90 glass-nav border-b border-slate-200/80 dark:border-slate-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Identity */}
          <div
            className="flex items-center gap-3.5 cursor-pointer group flex-shrink-0"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-black shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  TITAN<span className="text-emerald-500 font-extrabold">PRO</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-medium tracking-wider uppercase px-1.5 py-0.2 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-md bg-emerald-500/5">
                  Gym
                </span>
              </div>
              <p className="text-[11px] font-normal text-slate-400 tracking-normal hidden sm:block">
                Performance & Fitness
              </p>
            </div>
          </div>

          {/* Center: Breathable Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative py-2 text-[14px] font-normal transition-colors ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Quick role portal link when logged in */}
            {isMember && (
              <button
                onClick={() => setActiveTab('member-portal')}
                className={`relative py-2 text-[14px] font-normal transition-colors ${
                  activeTab === 'member-portal'
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-emerald-600/80 dark:text-emerald-400/80 hover:text-emerald-500'
                }`}
              >
                My Pass
                {activeTab === 'member-portal' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin-portal')}
                className={`relative py-2 text-[14px] font-normal transition-colors ${
                  activeTab === 'admin-portal'
                    ? 'text-amber-500 font-semibold'
                    : 'text-amber-500/80 hover:text-amber-400'
                }`}
              >
                Admin Desk
                {activeTab === 'admin-portal' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            )}
          </nav>

          {/* Right: Uncluttered Utility Controls */}
          <div className="flex items-center gap-3">
            {/* Minimalist Radio Indicator Pill */}
            <button
              onClick={togglePlay}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-normal border transition-all ${
                isPlaying
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
              title="Ad-Free Gym Radio Stream"
            >
              <Radio className={`w-3.5 h-3.5 ${isPlaying ? 'text-emerald-500 animate-pulse' : ''}`} />
              <span className="font-normal">{isPlaying ? 'Radio Live' : 'Gym Beats'}</span>
              {isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              )}
            </button>

            {/* Clean Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Feedback Trigger */}
            <button
              onClick={onOpenFeedback}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-normal text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Feedback</span>
            </button>

            {/* Profile & Role Badge */}
            <div className="relative pl-2 border-l border-slate-200 dark:border-slate-800">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                      {isAdmin ? (
                        <ShieldCheck className="w-4 h-4 text-amber-500" />
                      ) : (
                        currentUser.name.charAt(0)
                      )}
                    </div>
                    <div className="hidden sm:block text-left pr-1">
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-none">
                        {currentUser.name.split(' ')[0]}
                      </p>
                      <span className="text-[10px] font-normal text-slate-400">
                        {isAdmin ? 'Admin' : 'Member'}
                      </span>
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-12 w-48 py-1.5 bg-white dark:bg-[#12141c] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 animate-in fade-in slide-in-from-top-1 text-xs">
                      <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-normal truncate">
                          {currentUser.email}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab(isAdmin ? 'admin-portal' : 'member-portal');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-normal transition-colors"
                      >
                        {isAdmin ? 'Admin Dashboard' : 'My Membership Pass'}
                      </button>

                      <button
                        onClick={() => {
                          if (isAdmin) loginAsMember();
                          else loginAsAdmin();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-normal transition-colors"
                      >
                        Switch to {isAdmin ? 'Member Demo' : 'Admin Demo'}
                      </button>

                      <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 font-normal flex items-center gap-1.5 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => loginAsMember()}
                    className="px-3 py-1.5 text-xs font-normal text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Member
                  </button>
                  <button
                    onClick={() => loginAsAdmin()}
                    className="px-3.5 py-1.5 text-xs font-medium bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl transition-all shadow-sm"
                  >
                    Admin Login
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-left text-sm font-normal transition-colors ${
                    activeTab === link.id
                      ? 'text-emerald-500 font-semibold bg-emerald-500/10'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              {currentUser && (
                <button
                  onClick={() => {
                    setActiveTab(isAdmin ? 'admin-portal' : 'member-portal');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl text-left text-sm font-semibold text-emerald-500 bg-emerald-500/5"
                >
                  {isAdmin ? 'Admin Dashboard' : 'My Membership'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
