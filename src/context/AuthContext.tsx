import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types';
import { INITIAL_MEMBERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  isMember: boolean;
  membersList: User[];
  loginAsAdmin: () => void;
  loginAsMember: (memberId?: string) => void;
  logout: () => void;
  onboardNewMember: (member: Omit<User, 'id'>) => User;
  renewCurrentMember: (months: number, planTitle: string) => void;
}

const ADMIN_USER: User = {
  id: 'admin-1',
  name: 'Chief Gym Admin',
  email: 'admin@titanfitness.com',
  phone: '+91 99999 88888',
  role: 'admin',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [membersList, setMembersList] = useState<User[]>(INITIAL_MEMBERS);
  // Default logged in as member Rohit Sharma so the user can immediately experience the Member Portal
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_MEMBERS[0]);

  const loginAsAdmin = () => {
    setCurrentUser(ADMIN_USER);
  };

  const loginAsMember = (memberId?: string) => {
    if (memberId) {
      const found = membersList.find((m) => m.id === memberId);
      if (found) {
        setCurrentUser(found);
        return;
      }
    }
    // Default to first member
    setCurrentUser(membersList[0]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const onboardNewMember = (data: Omit<User, 'id'>): User => {
    const newMember: User = {
      ...data,
      id: `mem-${Date.now()}`,
      referralCode: `${data.name.split(' ')[0].toUpperCase()}${Math.floor(10 + Math.random() * 90)}`,
      referralCount: 0,
      status: 'active',
    };
    setMembersList((prev) => [newMember, ...prev]);
    return newMember;
  };

  const renewCurrentMember = (months: number, planTitle: string) => {
    if (!currentUser || currentUser.role !== 'user') return;

    const today = new Date();
    const expiry = new Date();
    expiry.setMonth(today.getMonth() + months);

    const updated: User = {
      ...currentUser,
      planName: planTitle,
      membershipStartDate: today.toISOString().split('T')[0],
      membershipEndDate: expiry.toISOString().split('T')[0],
      daysRemaining: months * 30,
      status: 'active',
    };

    setCurrentUser(updated);
    setMembersList((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin: currentUser?.role === 'admin',
        isMember: currentUser?.role === 'user',
        membersList,
        loginAsAdmin,
        loginAsMember,
        logout,
        onboardNewMember,
        renewCurrentMember,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
