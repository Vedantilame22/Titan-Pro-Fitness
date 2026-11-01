import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { INITIAL_REVIEWS } from './data/mockData';
import type { Review, Suggestion, MembershipPlan } from './types';
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { OverviewSection } from './components/public/OverviewSection';
import { EquipmentsSection } from './components/public/EquipmentsSection';
import { PlansSection } from './components/public/PlansSection';
import { TimingsSection } from './components/public/TimingsSection';
import { OffersSection } from './components/public/OffersSection';
import { ReviewsSection } from './components/public/ReviewsSection';
import { Footer } from './components/public/Footer';
import { FloatingAudioPlayer } from './components/audio/FloatingAudioPlayer';
import { SuggestionModal } from './components/feedback/SuggestionModal';
import { WorkoutSplitsSection } from './components/member/WorkoutSplitsSection';
import { ExerciseTutorialsModal } from './components/member/ExerciseTutorialsModal';
import { MemberDashboard } from './components/member/MemberDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AiWorkoutPlannerModal } from './components/manus/AiWorkoutPlannerModal';
import { AiMacroNutritionModal } from './components/manus/AiMacroNutritionModal';
import { Modal } from './components/common/Modal';
import { Button } from './components/common/Button';
import { triggerConfetti } from './utils/confetti';
import { ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const { currentUser, isMember, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<string>('home');
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<MembershipPlan | null>(null);
  const [isAiPlannerOpen, setIsAiPlannerOpen] = useState(false);
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);

  const handleAddReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const rev: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setReviews([rev, ...reviews]);
  };

  const handleAddSuggestion = (sug: Omit<Suggestion, 'id' | 'date' | 'status'>) => {
    console.log('Suggestion submitted:', sug);
  };

  const handleConfirmPlan = () => {
    if (!checkoutPlan) return;
    triggerConfetti();
    alert(`🔥 Congratulations! You have enrolled in the ${checkoutPlan.title} plan! Welcome to Titan Pro Gym.`);
    setCheckoutPlan(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090d] text-slate-100 selection:bg-red-500 selection:text-white">
      {/* Top Navigation Bar - Clean, focused, uncrowded */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-32">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onExplorePlans={() => setActiveTab('plans')}
              onExploreEquipments={() => setActiveTab('equipments')}
              onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
              onOpenNutrition={() => setIsNutritionOpen(true)}
            />
            <OverviewSection onExplorePlans={() => setActiveTab('plans')} />
            <EquipmentsSection />
            <PlansSection onSelectPlan={(plan) => setCheckoutPlan(plan)} />
            <TimingsSection />
            <OffersSection />
            <ReviewsSection
              reviews={reviews}
              onOpenReviewModal={() => setIsFeedbackOpen(true)}
            />
          </>
        )}

        {activeTab === 'equipments' && (
          <div className="pt-8 sm:pt-12">
            <EquipmentsSection />
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="pt-8 sm:pt-12">
            <PlansSection onSelectPlan={(plan) => setCheckoutPlan(plan)} />
          </div>
        )}

        {activeTab === 'timings' && (
          <div className="pt-8 sm:pt-12">
            <TimingsSection />
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="pt-8 sm:pt-12">
            <OffersSection />
          </div>
        )}

        {activeTab === 'workouts' && (
          <div className="pt-8 sm:pt-12">
            <WorkoutSplitsSection
              onSelectExercise={(exName) => setSelectedExercise(exName)}
            />
          </div>
        )}

        {activeTab === 'member-portal' && (
          <div className="pt-8 sm:pt-12">
            <MemberDashboard
              onOpenFeedback={() => setIsFeedbackOpen(true)}
              onSelectExercise={(exName) => setSelectedExercise(exName)}
            />
          </div>
        )}

        {activeTab === 'admin-portal' && (
          <div className="pt-8 sm:pt-12">
            <AdminDashboard />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
      />

      {/* Persistent Floating Ad-Free Audio Player */}
      <FloatingAudioPlayer />

      {/* Suggestion / Review Modal */}
      <SuggestionModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onAddSuggestion={handleAddSuggestion}
        onAddReview={handleAddReview}
      />

      {/* Exercise Tutorial Video Modal */}
      <ExerciseTutorialsModal
        isOpen={Boolean(selectedExercise)}
        onClose={() => setSelectedExercise(null)}
        initialExerciseName={selectedExercise || undefined}
      />

      {/* Manus AI Workout Protocol Modal */}
      <AiWorkoutPlannerModal
        isOpen={isAiPlannerOpen}
        onClose={() => setIsAiPlannerOpen(false)}
        onApplyPlan={() => setActiveTab('workouts')}
      />

      {/* Manus AI Precision Macro Nutrition Modal */}
      <AiMacroNutritionModal
        isOpen={isNutritionOpen}
        onClose={() => setIsNutritionOpen(false)}
      />

      {/* Plan Join Checkout Modal with Motion Spring */}
      <Modal
        isOpen={Boolean(checkoutPlan)}
        onClose={() => setCheckoutPlan(null)}
        title={checkoutPlan ? `Join ${checkoutPlan.title}` : 'Join Plan'}
        subtitle="Complete your athlete enrollment with zero registration fees."
        maxWidth="md"
      >
        {checkoutPlan && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-red-500/15 border border-red-500/30">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-heading font-bold text-sm text-white">
                  Total Membership Fee
                </span>
                <span className="font-heading text-3xl font-black text-red-400">
                  ₹{checkoutPlan.price.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs font-normal text-slate-400">
                Duration: {checkoutPlan.durationMonths} Months ({checkoutPlan.durationMonths * 30} Days unlimited gym access)
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Payment Options (Zero Convenience Fee):
              </span>
              <div className="p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-medium">
                <span>Direct UPI / QR Code at Reception</span>
                <span className="text-red-400 font-bold">₹0 Extra</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-medium">
                <span>Credit / Debit Card / Net Banking</span>
                <span className="text-red-400 font-bold">Instant Activation</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Full 100% money-back guarantee if cancelled within 48 hours.</span>
            </div>

            <Button
              variant="glow"
              size="lg"
              onClick={handleConfirmPlan}
              className="w-full mt-2"
            >
              Confirm Enrollment & Activate Pass
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
