import React, { useState } from 'react';
import { MessageSquare, Star, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { triggerConfetti } from '../../utils/confetti';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import type { Suggestion, Review } from '../../types';

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuggestion: (suggestion: Omit<Suggestion, 'id' | 'date' | 'status'>) => void;
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export const SuggestionModal: React.FC<SuggestionModalProps> = ({
  isOpen,
  onClose,
  onAddSuggestion,
  onAddReview,
}) => {
  const [activeTab, setActiveTab] = useState<'suggestion' | 'review'>('suggestion');

  // Suggestion state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<Suggestion['type']>('General Suggestion');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Review state
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const handleSubmitSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subject || !message) return;

    onAddSuggestion({
      userName: name,
      userPhone: phone,
      type,
      subject,
      message,
    });

    triggerConfetti();

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setSubject('');
      setMessage('');
    }, 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !reviewComment) return;

    onAddReview({
      name,
      rating,
      comment: reviewComment,
      verifiedMember: true,
    });

    triggerConfetti();

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setReviewComment('');
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Member Voice & Feedback"
      subtitle="Your feedback goes directly to gym management to improve your workout experience."
      maxWidth="lg"
    >
      {/* Tab Switcher */}
      <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl mb-6 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('suggestion')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeTab === 'suggestion'
              ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Suggestion & Request Box
        </button>
        <button
          onClick={() => setActiveTab('review')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeTab === 'review'
              ? 'bg-white dark:bg-slate-800 text-amber-500 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          Rate & Review Gym
        </button>
      </div>

      {submitted ? (
        <div className="py-12 text-center animate-in zoom-in-95">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-3 animate-bounce" />
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
            Thank You, Beast!
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {activeTab === 'suggestion'
              ? 'Your suggestion has been securely delivered to the owner.'
              : 'Your review has been added to our public wall of fame!'}
          </p>
        </div>
      ) : activeTab === 'suggestion' ? (
        <form onSubmit={handleSubmitSuggestion} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohit Sharma"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Feedback Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Suggestion['type'])}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
            >
              <option value="General Suggestion">General Suggestion</option>
              <option value="Equipment Request">Equipment Request (New machine/plates)</option>
              <option value="Maintenance">Maintenance Issue (Broken cable, AC, locker)</option>
              <option value="Complaint">Confidential Complaint</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Subject *
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Need more 20kg plates for deadlifts"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Details *
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explain how we can make your workout smoother..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white resize-none"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full" icon={<Send className="w-4 h-4" />}>
            Submit to Management
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sneha Kulkarni"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
              Rate Your Experience
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1.5 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-sm text-amber-400">
                {rating === 5 ? '5.0 / 5.0 (Legendary!)' : `${rating}.0 / 5.0`}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Review Comment *
            </label>
            <textarea
              required
              rows={3}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Tell others what you love about our gym, vibe, music, or machines..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 dark:text-white resize-none"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full" icon={<Sparkles className="w-4 h-4 text-amber-900" />}>
            Post Public Review
          </Button>
        </form>
      )}
    </Modal>
  );
};
