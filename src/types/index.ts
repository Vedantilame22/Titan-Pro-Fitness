export type UserRole = 'admin' | 'user';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  planId?: string;
  planName?: string;
  membershipStartDate?: string;
  membershipEndDate?: string;
  daysRemaining?: number;
  referralCode?: string;
  referralCount?: number;
  status?: 'active' | 'expiring' | 'expired';
};

export type MembershipPlan = {
  id: string;
  title: string;
  price: number;
  durationMonths: number;
  popular?: boolean;
  description: string;
  features: string[];
};

export type Equipment = {
  id: string;
  name: string;
  category: 'Cardio' | 'Free Weights' | 'Machines' | 'Functional';
  brand: string;
  quantity: number;
  description: string;
  imageUrl: string;
  status: 'Available' | 'Maintenance';
};

export type SpecialOffer = {
  id: string;
  code: string;
  title: string;
  discountPercentage: number;
  description: string;
  validUntil: string;
  badge: string;
  active: boolean;
};

export type OpenTiming = {
  day: string;
  hours: string;
  isToday?: boolean;
  peakHours: string;
};

export type PaymentRecord = {
  id: string;
  userId: string;
  userName: string;
  planTitle: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Failed';
  paymentMethod: 'UPI' | 'Card' | 'Cash' | 'NetBanking';
  receiptNo: string;
};

export type Suggestion = {
  id: string;
  userId?: string;
  userName: string;
  userPhone?: string;
  type: 'Complaint' | 'Equipment Request' | 'General Suggestion' | 'Maintenance';
  subject: string;
  message: string;
  date: string;
  status: 'Pending' | 'In Review' | 'Resolved';
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verifiedMember: boolean;
};

export type Exercise = {
  id: string;
  title: string;
  category: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  targetMuscle: string;
  instructions: string[];
  tips: string;
  videoUrl?: string;
};

export type WorkoutSchedule = {
  id: string;
  splitName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  daysPerWeek: number;
  goal: string;
  schedule: {
    day: string;
    focus: string;
    exercises: string[];
  }[];
};

export type AudioTrack = {
  id: string;
  title: string;
  genre: 'Phonk' | 'EDM' | 'Gym Motivation' | 'Lo-Fi Chill';
  artist: string;
  streamUrl: string;
  duration?: string;
};
