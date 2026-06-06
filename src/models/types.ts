import { Dispatch, SetStateAction } from 'react'

export interface SolutionFeature {
  title: string
  icon: string
}

export interface LostMMR {
  mrr: number,
  failedRevenue: number
  recoverable: number
  weRecover: number
  weCharge: number
  netGain: number
}

export interface FAQ {
  question: string
  answer: string
}

export interface AuthData {
  userId: number
  email: string
  roles: number[]
  accessToken: string
  stripeConnected?: boolean
  customerId?: string
  subscriptionTier?: 'free' | 'starter' | 'pro'
  onboardingComplete?: boolean
  emailVerified?: boolean
  profileImageUrl?: string
}

export interface AuthContextType {
  auth: AuthData | null
  setAuth: Dispatch<SetStateAction<AuthData | null>>
  persist: boolean
  setPersist: Dispatch<SetStateAction<boolean>>
}

export interface FormState {
  success: boolean
  message: string | null
  errors?: any
}

export interface StripeInfo {
    connected: boolean;
    stripeAccountId?: string;
    chargesEnabled?: boolean;
    detailsSubmitted?: boolean;
    payoutsEnabled?: boolean;
    country?: string;
    stripeEmail?: string;
}

export interface MeResponse {
    id: string;
    email: string;
    company?: string;
    roles: number[];
    stripe: StripeInfo | null;
}


export type NavItem = {
    label: string;
    path: string;
    exact?: boolean;
};

export type UseStripeResult = {
    stripe: StripeInfo | null
    isLoading: boolean
}
