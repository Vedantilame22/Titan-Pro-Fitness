import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  UserPlus,
  Clock,
  Dumbbell,
  Tag,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import type { Suggestion, Equipment, SpecialOffer } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  INITIAL_EQUIPMENTS,
  INITIAL_OFFERS,
  INITIAL_SUGGESTIONS,
} from '../../data/mockData';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { OnboardMemberModal } from './OnboardMemberModal';
import { HaikeiMeshGlow } from '../haikei/HaikeiMeshGlow';

export const AdminDashboard: React.FC = () => {
  const { membersList, onboardNewMember } = useAuth();

  const [activeTab, setActiveTab] = useState<'members' | 'renewals' | 'suggestions' | 'equipments' | 'offers'>('members');
  const [showOnboardModal, setShowOnboardModal] = useState(false);

  const [suggestions, setSuggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS);
  const [equipments, setEquipments] = useState<Equipment[]>(INITIAL_EQUIPMENTS);
  const [offers, setOffers] = useState<SpecialOffer[]>(INITIAL_OFFERS);

  const [memberSearch, setMemberSearch] = useState('');

  const handleResolveSuggestion = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Resolved' } : s))
    );
  };

  const handleToggleOffer = (id: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o))
    );
  };

  const filteredMembers = membersList.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.phone.includes(memberSearch) ||
      (m.planName && m.planName.toLowerCase().includes(memberSearch.toLowerCase()))
  );

  const expiringCount = membersList.filter((m) => (m.daysRemaining ?? 0) <= 7).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Admin Aura Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white overflow-hidden shadow-2xl">
        <HaikeiMeshGlow variant="crimson" className="opacity-60" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                Operations Command Center
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300">
                Live Sync
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Titan Pro Gym Desk
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Manage athlete admissions, RFID memberships, floor equipment maintenance, and feedback.
            </p>
          </div>

          <Button
            variant="glow"
            size="md"
            onClick={() => setShowOnboardModal(true)}
            icon={<UserPlus className="w-4 h-4 text-white" />}
            className="flex-shrink-0"
          >
            Onboard New Athlete
          </Button>
        </div>
      </div>

      {/* Top Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card hoverEffect glass className="p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Active Athletes</span>
            <Users className="w-4 h-4 text-red-500" />
          </div>
          <div className="font-heading text-3xl font-black text-white">
            {membersList.length}
          </div>
          <span className="text-[11px] font-bold text-red-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +3 enrolled this week
          </span>
        </Card>

        <Card hoverEffect glass className="p-6 rounded-3xl border border-amber-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Expiring Soon</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-heading text-3xl font-black text-amber-400">
            {expiringCount}
          </div>
          <span className="text-[11px] font-medium text-slate-400 mt-1 block">Due in 7 days</span>
        </Card>

        <Card hoverEffect glass className="p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Active Machinery</span>
            <Dumbbell className="w-4 h-4 text-orange-400" />
          </div>
          <div className="font-heading text-3xl font-black text-white">
            {equipments.length}
          </div>
          <span className="text-[11px] font-bold text-orange-400 mt-1 block">100% Floor Operational</span>
        </Card>

        <Card hoverEffect glass className="p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Pending Feedback</span>
            <MessageSquare className="w-4 h-4 text-rose-400" />
          </div>
          <div className="font-heading text-3xl font-black text-white">
            {suggestions.filter((s) => s.status !== 'Resolved').length}
          </div>
          <span className="text-[11px] font-medium text-slate-400 mt-1 block">Action requested</span>
        </Card>
      </div>

      {/* Admin Nav Tabs with Motion Sliding Indicator */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm backdrop-blur-md">
        {[
          { id: 'members', label: 'All Members', icon: <Users className="w-3.5 h-3.5" /> },
          { id: 'renewals', label: `Renewals (${expiringCount})`, icon: <Clock className="w-3.5 h-3.5" /> },
          { id: 'suggestions', label: 'Suggestions Inbox', icon: <MessageSquare className="w-3.5 h-3.5" /> },
          { id: 'equipments', label: 'Equipments', icon: <Dumbbell className="w-3.5 h-3.5" /> },
          { id: 'offers', label: 'Special Offers', icon: <Tag className="w-3.5 h-3.5" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors z-10 cursor-pointer ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-admin-tab"
                  className="absolute inset-0 bg-slate-800 rounded-xl shadow-sm border border-slate-700"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'members' && (
            <Card className="p-0 overflow-hidden border border-slate-800 rounded-3xl bg-[#0c0e14]">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    placeholder="Search member name or phone..."
                    className="w-full pl-9 pr-3.5 py-2 text-xs font-medium bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-red-500 text-white"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                  {filteredMembers.length} Members Enrolled
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-normal">
                  <thead className="bg-[#0a0b10] text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4 sm:px-6">Member Name</th>
                      <th className="p-4 sm:px-6">Contact</th>
                      <th className="p-4 sm:px-6">Active Plan</th>
                      <th className="p-4 sm:px-6">Valid Until</th>
                      <th className="p-4 sm:px-6">Referrals</th>
                      <th className="p-4 sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 sm:px-6 font-bold text-white">{m.name}</td>
                        <td className="p-4 sm:px-6 text-slate-400">
                          <div className="font-medium text-slate-200">{m.phone}</div>
                          <div className="text-[10px] text-slate-500">{m.email}</div>
                        </td>
                        <td className="p-4 sm:px-6 font-bold text-orange-400">{m.planName}</td>
                        <td className="p-4 sm:px-6 text-slate-400">
                          {m.membershipEndDate}
                          <span className="block text-[10px] text-slate-500 font-medium">
                            {m.daysRemaining} days left
                          </span>
                        </td>
                        <td className="p-4 sm:px-6 font-semibold text-slate-300">
                          {m.referralCount ?? 0} invites
                        </td>
                        <td className="p-4 sm:px-6">
                          <Badge
                            variant={
                              (m.daysRemaining ?? 0) <= 0
                                ? 'red'
                                : (m.daysRemaining ?? 0) <= 7
                                ? 'amber'
                                : 'neon'
                            }
                          >
                            {(m.daysRemaining ?? 0) <= 0
                              ? 'Expired'
                              : (m.daysRemaining ?? 0) <= 7
                              ? 'Expiring'
                              : 'Active'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === 'renewals' && (
            <Card className="space-y-4 p-8 rounded-3xl border border-slate-800 bg-[#0c0e14]">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  Membership Renewals Follow-up
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Members whose passes have expired or expire in the next 7 days. Send customized renewal reminders with one click.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {membersList
                  .filter((m) => (m.daysRemaining ?? 0) <= 7)
                  .map((m) => (
                    <div
                      key={m.id}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-sm text-white">
                            {m.name}
                          </span>
                          <Badge variant={(m.daysRemaining ?? 0) <= 0 ? 'red' : 'amber'}>
                            {(m.daysRemaining ?? 0) <= 0 ? 'Expired' : `${m.daysRemaining} Days Left`}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Plan: {m.planName} • Phone: {m.phone}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const msg = encodeURIComponent(
                            `Hi ${m.name}! Your ${m.planName} membership at Titan Pro Gym expires on ${m.membershipEndDate}. Renew today to lock in existing prices and continue your fitness streak!`
                          );
                          window.open(`https://api.whatsapp.com/send?phone=${m.phone.replace(/[^0-9]/g, '')}&text=${msg}`, '_blank');
                        }}
                        className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                      >
                        Send WhatsApp Reminder
                      </button>
                    </div>
                  ))}
              </div>
            </Card>
          )}

          {activeTab === 'suggestions' && (
            <div className="space-y-4">
              {suggestions.map((sug) => (
                <Card key={sug.id} className="p-6 rounded-3xl border border-slate-800 bg-[#0c0e14] flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={sug.type === 'Complaint' ? 'red' : 'cyan'}>
                        {sug.type}
                      </Badge>
                      <span className="text-xs text-slate-400">{sug.date}</span>
                    </div>
                    <h4 className="font-heading font-bold text-base text-white">
                      {sug.subject}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "{sug.message}"
                    </p>
                    <div className="text-[11px] text-slate-400 pt-1">
                      From: <span className="font-semibold text-slate-200">{sug.userName}</span> ({sug.userPhone})
                    </div>
                  </div>

                  <div className="flex sm:flex-col justify-end items-end gap-2 flex-shrink-0">
                    <Badge variant={sug.status === 'Resolved' ? 'flame' : 'amber'}>
                      {sug.status}
                    </Badge>
                    {sug.status !== 'Resolved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResolveSuggestion(sug.id)}
                        className="text-xs font-semibold"
                      >
                        Mark Resolved
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {offers.map((off) => (
                <Card key={off.id} className="p-6 rounded-3xl border border-slate-800 bg-[#0c0e14] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={off.active ? 'flame' : 'slate'}>
                        {off.active ? 'Active on Website' : 'Hidden'}
                      </Badge>
                      <span className="font-mono text-xs font-bold text-orange-400">
                        {off.code}
                      </span>
                    </div>
                    <h4 className="font-heading font-extrabold text-lg text-white">
                      {off.discountPercentage}% OFF - {off.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">{off.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Valid: {off.validUntil}</span>
                    <Button
                      size="sm"
                      variant={off.active ? 'secondary' : 'primary'}
                      onClick={() => handleToggleOffer(off.id)}
                      className="text-xs"
                    >
                      {off.active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'equipments' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipments.map((eq) => (
                <Card key={eq.id} className="p-5 rounded-3xl border border-slate-800 bg-[#0c0e14] flex items-center justify-between gap-3">
                  <div>
                    <h5 className="font-heading font-bold text-sm text-white">
                      {eq.name}
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">{eq.brand} • Qty: {eq.quantity}</p>
                    <span className="text-[10px] font-bold text-red-400">{eq.category}</span>
                  </div>
                  <Badge variant={eq.status === 'Available' ? 'neon' : 'amber'}>
                    {eq.status}
                  </Badge>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Onboard Member Modal */}
      <OnboardMemberModal
        isOpen={showOnboardModal}
        onClose={() => setShowOnboardModal(false)}
        onOnboard={onboardNewMember}
      />
    </div>
  );
};
