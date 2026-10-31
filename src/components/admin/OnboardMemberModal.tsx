import React, { useState } from 'react';
import type { User, MembershipPlan } from '../../types';
import { INITIAL_PLANS } from '../../data/mockData';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface OnboardMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOnboard: (member: Omit<User, 'id'>) => void;
}

export const OnboardMemberModal: React.FC<OnboardMemberModalProps> = ({
  isOpen,
  onClose,
  onOnboard,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [planId, setPlanId] = useState(INITIAL_PLANS[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const chosenPlan =
      INITIAL_PLANS.find((p) => p.id === planId) || INITIAL_PLANS[0];
    const today = new Date();
    const expiry = new Date();
    expiry.setMonth(today.getMonth() + chosenPlan.durationMonths);

    onOnboard({
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      phone,
      role: 'user',
      planId: chosenPlan.id,
      planName: chosenPlan.title,
      membershipStartDate: today.toISOString().split('T')[0],
      membershipEndDate: expiry.toISOString().split('T')[0],
      daysRemaining: chosenPlan.durationMonths * 30,
    });

    setName('');
    setEmail('');
    setPhone('');
    onClose();
    alert(`Member ${name} registered under ${chosenPlan.title}!`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Onboard New Member"
      subtitle="Register a new member with their chosen plan and initial duration."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Deshmukh"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 00000"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@gmail.com"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
            Select Initial Plan *
          </label>
          <select
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
          >
            {INITIAL_PLANS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} - ₹{p.price} ({p.durationMonths} Months)
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" variant="primary" className="w-full font-bold">
          Confirm & Activate Member
        </Button>
      </form>
    </Modal>
  );
};
