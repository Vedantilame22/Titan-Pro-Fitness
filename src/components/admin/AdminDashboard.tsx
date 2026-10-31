import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Clock,
  Dumbbell,
  Tag,
  MessageSquare,
  Search,
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
      {/* Top Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c0e14]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-normal text-slate-500">Total Members</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-heading text-3xl font-bold text-slate-900 dark:text-white">
            {membersList.length}
          </div>
          <span className="text-[11px] font-normal text-emerald-500 mt-1 block">+3 registered this week</span>
        </Card>

        <Card className="p-6 rounded-3xl border border-amber-500/25 bg-white dark:bg-[#0c0e14]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-normal text-slate-500">Expiring Soon</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-heading text-3xl font-bold text-amber-500">
            {expiringCount}
          </div>
          <span className="text-[11px] font-normal text-slate-400 mt-1 block">Due in 7 days</span>
        </Card>

        <Card className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c0e14]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-normal text-slate-500">Active Machinery</span>
            <Dumbbell className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="font-heading text-3xl font-bold text-slate-900 dark:text-white">
            {equipments.length}
          </div>
          <span className="text-[11px] font-normal text-cyan-500 mt-1 block">100% Floor Operational</span>
        </Card>

        <Card className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c0e14]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-normal text-slate-500">Pending Feedback</span>
            <MessageSquare className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-heading text-3xl font-bold text-slate-900 dark:text-white">
            {suggestions.filter((s) => s.status !== 'Resolved').length}
          </div>
          <span className="text-[11px] font-normal text-slate-400 mt-1 block">In need of review</span>
        </Card>
      </div>

      {/* Admin Nav Tabs & Action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          {[
            { id: 'members', label: 'All Members', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'renewals', label: `Renewals (${expiringCount})`, icon: <Clock className="w-3.5 h-3.5" /> },
            { id: 'suggestions', label: 'Suggestions Inbox', icon: <MessageSquare className="w-3.5 h-3.5" /> },
            { id: 'equipments', label: 'Equipments', icon: <Dumbbell className="w-3.5 h-3.5" /> },
            { id: 'offers', label: 'Special Offers', icon: <Tag className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-normal flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-800 text-emerald-500 font-medium shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setShowOnboardModal(true)}
          icon={<UserPlus className="w-4 h-4" />}
          className="flex-shrink-0"
        >
          Onboard Member
        </Button>
      </div>

      {/* Active Tab Content */}
      {activeTab === 'members' && (
        <Card className="p-0 overflow-hidden border border-slate-200 dark:border-slate-800/80 rounded-3xl bg-white dark:bg-[#0c0e14]">
          <div className="p-5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                placeholder="Search member name or phone..."
                className="w-full pl-9 pr-3.5 py-2 text-xs font-normal bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
              />
            </div>
            <span className="text-xs font-normal text-slate-400 whitespace-nowrap">
              {filteredMembers.length} Members Enrolled
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-normal">
              <thead className="bg-slate-50 dark:bg-[#0a0b10] text-slate-400 uppercase tracking-wider text-[10px] font-medium border-b border-slate-200/80 dark:border-slate-800/80">
                <tr>
                  <th className="p-4 sm:px-6">Member Name</th>
                  <th className="p-4 sm:px-6">Contact</th>
                  <th className="p-4 sm:px-6">Active Plan</th>
                  <th className="p-4 sm:px-6">Valid Until</th>
                  <th className="p-4 sm:px-6">Referrals</th>
                  <th className="p-4 sm:px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 sm:px-6 font-medium text-slate-900 dark:text-white">{m.name}</td>
                    <td className="p-4 sm:px-6 text-slate-500 font-normal">
                      <div>{m.phone}</div>
                      <div className="text-[10px] text-slate-400">{m.email}</div>
                    </td>
                    <td className="p-4 sm:px-6 font-normal text-emerald-500">{m.planName}</td>
                    <td className="p-4 sm:px-6 text-slate-500 font-normal">
                      {m.membershipEndDate}
                      <span className="block text-[10px] text-slate-400">
                        {m.daysRemaining} days left
                      </span>
                    </td>
                    <td className="p-4 sm:px-6 font-normal text-slate-600 dark:text-slate-300">
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

      {/* Renewals Reminder Tab */}
      {activeTab === 'renewals' && (
        <Card className="space-y-4 p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c0e14]">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Membership Renewals Follow-up
            </h3>
            <p className="text-xs font-normal text-slate-500 mt-1">
              Members whose passes have expired or expire in the next 7 days. Send customized renewal reminders with one click.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {membersList
              .filter((m) => (m.daysRemaining ?? 0) <= 7)
              .map((m) => (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-semibold text-sm text-slate-900 dark:text-white">
                        {m.name}
                      </span>
                      <Badge variant={(m.daysRemaining ?? 0) <= 0 ? 'red' : 'amber'}>
                        {(m.daysRemaining ?? 0) <= 0 ? 'Expired' : `${m.daysRemaining} Days Left`}
                      </Badge>
                    </div>
                    <p className="text-xs font-normal text-slate-400 mt-1">
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
                    className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Send WhatsApp Reminder
                  </button>
                </div>
              ))}
          </div>
        </Card>
      )}

      {/* Suggestions Inbox Tab */}
      {activeTab === 'suggestions' && (
        <div className="space-y-4">
          {suggestions.map((sug) => (
            <Card key={sug.id} className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c0e14] flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={sug.type === 'Complaint' ? 'red' : 'cyan'}>
                    {sug.type}
                  </Badge>
                  <span className="text-xs font-normal text-slate-400">{sug.date}</span>
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                  {sug.subject}
                </h4>
                <p className="text-xs font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                  "{sug.message}"
                </p>
                <div className="text-[11px] font-normal text-slate-400 pt-1">
                  From: <span className="font-medium text-slate-300">{sug.userName}</span> ({sug.userPhone})
                </div>
              </div>

              <div className="flex sm:flex-col justify-end items-end gap-2 flex-shrink-0">
                <Badge variant={sug.status === 'Resolved' ? 'neon' : 'amber'}>
                  {sug.status}
                </Badge>
                {sug.status !== 'Resolved' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResolveSuggestion(sug.id)}
                    className="text-xs font-normal"
                  >
                    Mark Resolved
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Offers Management Tab */}
      {activeTab === 'offers' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {offers.map((off) => (
            <Card key={off.id} className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c0e14] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={off.active ? 'neon' : 'slate'}>
                    {off.active ? 'Active on Website' : 'Hidden'}
                  </Badge>
                  <span className="font-mono text-xs font-medium text-emerald-400">
                    {off.code}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                  {off.discountPercentage}% OFF - {off.title}
                </h4>
                <p className="text-xs font-normal text-slate-400 mt-1">{off.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-normal text-slate-400">Valid: {off.validUntil}</span>
                <Button
                  size="sm"
                  variant={off.active ? 'secondary' : 'primary'}
                  onClick={() => handleToggleOffer(off.id)}
                  className="text-xs font-normal"
                >
                  {off.active ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Equipments Tab */}
      {activeTab === 'equipments' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipments.map((eq) => (
            <Card key={eq.id} className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c0e14] flex items-center justify-between gap-3">
              <div>
                <h5 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                  {eq.name}
                </h5>
                <p className="text-xs font-normal text-slate-400 mt-0.5">{eq.brand} • Qty: {eq.quantity}</p>
                <span className="text-[10px] font-normal text-emerald-400">{eq.category}</span>
              </div>
              <Badge variant={eq.status === 'Available' ? 'neon' : 'amber'}>
                {eq.status}
              </Badge>
            </Card>
          ))}
        </div>
      )}

      {/* Onboard Member Modal */}
      <OnboardMemberModal
        isOpen={showOnboardModal}
        onClose={() => setShowOnboardModal(false)}
        onOnboard={onboardNewMember}
      />
    </div>
  );
};
