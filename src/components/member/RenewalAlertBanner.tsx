import React from 'react';
import { AlertTriangle, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { User } from '../../types';
import { Button } from '../common/Button';

interface RenewalAlertBannerProps {
  user: User;
  onRenewClick: () => void;
}

export const RenewalAlertBanner: React.FC<RenewalAlertBannerProps> = ({
  user,
  onRenewClick,
}) => {
  const days = user.daysRemaining ?? 0;
  const isExpired = days <= 0;
  const isExpiringSoon = days > 0 && days <= 7;

  if (!isExpired && !isExpiringSoon) {
    return (
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Membership Active ({user.planName})
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Valid until <span className="font-semibold text-emerald-500">{user.membershipEndDate}</span> ({days} days remaining)
            </p>
          </div>
        </div>

        <Button size="sm" variant="outline" onClick={onRenewClick}>
          Extend Plan
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 shadow-lg ${
        isExpired
          ? 'bg-red-500/10 border-red-500/40 text-red-500'
          : 'bg-amber-500/10 border-amber-500/40 text-amber-500'
      }`}
    >
      <div className="flex items-start sm:items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isExpired ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
          }`}
        >
          {isExpired ? <AlertTriangle className="w-5 h-5" /> : <Clock className="w-5 h-5 animate-pulse" />}
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {isExpired
              ? 'Membership Expired - Access Suspended'
              : `Renewal Reminder: Only ${days} Days Remaining!`}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            {isExpired
              ? `Your ${user.planName} expired on ${user.membershipEndDate}. Renew now to regain instant gym floor access.`
              : `Your ${user.planName} expires on ${user.membershipEndDate}. Renew today to lock in your existing rate.`}
          </p>
        </div>
      </div>

      <Button
        variant={isExpired ? 'danger' : 'primary'}
        size="sm"
        onClick={onRenewClick}
        icon={<ArrowRight className="w-4 h-4" />}
        className="w-full sm:w-auto font-bold flex-shrink-0"
      >
        Renew Membership
      </Button>
    </div>
  );
};
