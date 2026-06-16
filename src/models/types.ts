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


export interface DashboardOverviewData {
    totalFailedPayments: number,
    activeRecoveries: number
    recoveredRevenue: number
    atRiskCustomers: number
    recoveryRate: number
    revenueAtRisk: number,
    averageRecoveryTime: number,
    retryForgeRecoveries: number,
    retryForgePercent: number,
    stripeRecoveries: number,
    stripePercent: number,
    manualRecoveries: number,
    manualPercent: number,
}

export interface DashboardRecovery {
    id: string
    customer: string
    amount: number
    failureReason: string | null
    attempts: number
    status: string
    failedDate: string
    hostedInvoiceUrl?: string | null
}

export interface DashboardCustomer {
    id: string
    stripeCustomerId: string
    email: string | null
    name: string | null
    phone: string | null
    activeFailures: number
    recoveredInvoices: number
    totalAtRisk: number
    recoveredRevenue: number
    lastFailedAt: string | null
}

export interface FailureReason {
    failure_code: string
    count: number
}

export interface DashboardAnalyticsFields {
    totalFailures: number
    activeRecoveries: number
    recoveredCases: number
    recoveredRevenue: number
    revenueAtRisk: number
    recoveryRate: number
    failureReasons: FailureReason[]
}

