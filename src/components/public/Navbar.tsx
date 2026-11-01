import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dumbbell,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenFeedback?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiPlanner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiPlanner,
}) => {
  const { currentUser, isAdmin, isMember, loginAsAdmin, loginAsMember, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Clean, focused navigation essentials - eliminates crowding
  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'equipments', label: 'Equipments' },
    { id: 'plans', label: 'Plans' },
    { id: 'workouts', label: 'Workouts' },
    { id: 'timings', label: 'Timings' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090d]/90 glass-nav border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Athletic Brand Identity */}
          <div
            className="flex items-center gap-3.5 cursor-pointer group flex-shrink-0"
            onClick={() => setActiveTab('home')}
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-orange-500 text-white flex items-center justify-center font-black shadow-lg shadow-red-600/30"
            >
              <Dumbbell className="w-5 h-5 -rotate-45" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-white">
                  TITAN<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">PRO</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 text-red-400 border border-red-500/30 rounded-md bg-red-500/10">
                  GYM
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-normal hidden sm:block">
                High Performance Sanctuary
              </p>
            </div>
          </div>

          {/* Center: Breathable Navigation Links with Motion sliding pill */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 border border-slate-800/80">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-colors duration-200 z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-navbar-indicator"
                      className="absolute inset-0 bg-slate-800 rounded-xl shadow-sm border border-slate-700/60"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}

            {isMember && (
              <button
                onClick={() => setActiveTab('member-portal')}
                className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-colors duration-200 z-10 ${
                  activeTab === 'member-portal' ? 'text-white' : 'text-red-400 hover:text-red-300'
                }`}
              >
                {activeTab === 'member-portal' && (
                  <motion.div
                    layoutId="active-navbar-indicator"
                    className="absolute inset-0 bg-slate-800 rounded-xl shadow-sm border border-slate-700/60"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-bold">My Pass</span>
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin-portal')}
                className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-colors duration-200 z-10 ${
                  activeTab === 'admin-portal' ? 'text-white' : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                {activeTab === 'admin-portal' && (
                  <motion.div
                    layoutId="active-navbar-indicator"
                    className="absolute inset-0 bg-slate-800 rounded-xl shadow-sm border border-slate-700/60"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-bold">Admin Desk</span>
              </button>
            )}
          </nav>

          {/* Right: Clean, uncrowded controls */}
          <div className="flex items-center gap-3">
            {onOpenAiPlanner && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenAiPlanner}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-600/15 to-orange-500/15 text-red-400 border border-red-500/30 hover:border-red-500/60 transition-all shadow-sm shadow-red-500/10 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>AI Routine</span>
              </motion.button>
            )}

            {/* Profile Dropdown */}
            <div className="relative pl-1 sm:pl-2 border-l border-slate-800">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-red-500/40 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {isAdmin ? (
                        <ShieldCheck className="w-4 h-4 text-white" />
                      ) : (
                        currentUser.name.charAt(0)
                      )}
                    </div>
                    <div className="hidden sm:block text-left pr-1">
                      <p className="text-xs font-semibold text-slate-200 leading-none">
                        {currentUser.name.split(' ')[0]}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {isAdmin ? 'Admin' : 'Athlete'}
                      </span>
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
                  </motion.button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                        className="absolute right-0 top-12 w-52 py-2 bg-[#11131a] border border-slate-800 rounded-2xl shadow-2xl z-50 text-xs backdrop-blur-xl"
                      >
                        <div className="px-3.5 py-2 border-b border-slate-800">
                          <p className="font-bold text-white truncate">
                            {currentUser.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {currentUser.email}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setActiveTab(isAdmin ? 'admin-portal' : 'member-portal');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-2 text-slate-300 hover:bg-slate-800/60 font-medium transition-colors"
                        >
                          {isAdmin ? 'Admin Dashboard' : 'My Membership Pass'}
                        </button>

                        <button
                          onClick={() => {
                            if (isAdmin) loginAsMember();
                            else loginAsAdmin();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-2 text-slate-300 hover:bg-slate-800/60 font-medium transition-colors"
                        >
                          Switch to {isAdmin ? 'Member Demo' : 'Admin Demo'}
                        </button>

                        <div className="border-t border-slate-800 mt-1 pt-1">
                          <button
                            onClick={() => {
                              logout();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-3.5 py-2 text-rose-500 hover:bg-rose-950/20 font-medium flex items-center gap-1.5 transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => loginAsMember()}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Member
                  </button>
                  <button
                    onClick={() => loginAsAdmin()}
                    className="px-3.5 py-1.5 text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl transition-all shadow-md shadow-red-600/25"
                  >
                    Admin
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Drawer with Motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-4 border-t border-slate-800 overflow-hidden"
            >
              <div className="flex flex-col gap-1.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-left text-sm font-semibold transition-colors ${
                      activeTab === link.id
                        ? 'text-red-400 bg-red-500/10'
                        : 'text-slate-400'
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
                    className="px-4 py-2.5 rounded-xl text-left text-sm font-bold text-red-400 bg-red-500/5"
                  >
                    {isAdmin ? 'Admin Dashboard' : 'My Membership'}
                  </button>
                )}
                {onOpenAiPlanner && (
                  <button
                    onClick={() => {
                      onOpenAiPlanner();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2.5 rounded-xl text-left text-sm font-bold text-orange-400 bg-orange-500/10 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Manus AI Workout Generator</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
