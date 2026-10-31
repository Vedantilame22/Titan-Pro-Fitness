import React from 'react';
import { Receipt, Download, CheckCircle, CreditCard, Clock } from 'lucide-react';
import type { PaymentRecord } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface PaymentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  payments: PaymentRecord[];
}

export const PaymentHistoryModal: React.FC<PaymentHistoryModalProps> = ({
  isOpen,
  onClose,
  payments,
}) => {
  const handleDownload = (record: PaymentRecord) => {
    alert(`Downloading Official Invoice Receipt: ${record.receiptNo} for ${record.planTitle} (₹${record.amount})`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment History & Digital Invoices"
      subtitle="View all past subscription renewals and download tax-compliant payment receipts."
      maxWidth="lg"
    >
      <div className="space-y-4">
        {payments.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No previous payments found.
          </div>
        ) : (
          payments.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1118] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {p.planTitle}
                    </h4>
                    <Badge variant="neon" className="text-[10px] py-0">
                      {p.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Receipt: <span className="font-mono text-slate-300">{p.receiptNo}</span>
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                    <span>Date: {p.date}</span>
                    <span>•</span>
                    <span>Method: {p.paymentMethod}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:border-l sm:pl-4 border-slate-200 dark:border-slate-800">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 block">Amount Paid</span>
                  <span className="text-base font-black text-emerald-500">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(p)}
                  icon={<Download className="w-3.5 h-3.5" />}
                  className="text-xs"
                >
                  Receipt
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};
