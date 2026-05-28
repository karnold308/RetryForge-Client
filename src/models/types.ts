import { Dispatch, SetStateAction } from 'react';

export interface SolutionFeature {
  title: string;
  icon: string;
};

export interface LostMMR {
  mrr: number,
  failedRevenue: number;
  recoverable: number;
  weRecover: number;
  weCharge: number;
  netGain: number;
};

export interface FAQ {
  question: string;
  answer: string;
}

export interface AuthData {
  user: string;
  roles: number[];
  accessToken: string;
  stripeConnected?: boolean;
  customerId?: string;
  subscriptionTier?: 'free' | 'starter' | 'pro';
  onboardingComplete?: boolean;
  emailVerified?: boolean;
  profileImageUrl?: string;
}

export interface AuthContextType {
  auth: AuthData | null;
  setAuth: Dispatch<SetStateAction<AuthData | null>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
}


export interface FormState {
  success: boolean;
  message: string | null;
  errors?: any;
}
