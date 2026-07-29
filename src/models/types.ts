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
    connected: boolean
    stripeAccountId?: string
    chargesEnabled?: boolean
    detailsSubmitted?: boolean
    payoutsEnabled?: boolean
    country?: string
    stripeEmail?: string
    historySyncStatus?: string
    historySyncStartedAt?: string | null
    historySyncCompletedAt?: string | null
    historySyncError?: string
    initialSyncComplete?: boolean
}

export interface MeResponse {
    id: string
    email: string
    company?: string
    roles: number[]
    stripe: StripeInfo | null
}


export type NavItem = {
    label: string
    path: string
    exact?: boolean
}

export type UseStripeResult = {
    stripe: StripeInfo | null
    isLoading: boolean
}


export interface DashboardOverviewData {
    totalFailedPayments: number
    activeRecoveries: number
    recoveredRevenue: number
    atRiskCustomers: number
    recoveryRate: number
    revenueAtRisk: number
    averageRecoveryTime: number
    retryForgeAutoRevenue: number
    retryForgeManualRevenue: number
    stripeRevenue: number
    manualRevenue: number
    retryForgeAutoPercent: number
    retryForgeManualPercent: number
    stripePercent: number
    manualPercent: number
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

export interface DashboardRecentRecovery {
    id: string
    customer: string
    amount: number
    source: string
    failureReason: string
    attempts: number
    recoveredAt: string
}

export interface SystemStatus {
    stripeConnected: boolean
    webhookHealthy: boolean
    lastWebhookAt: string
    schedulerHealthy: boolean
    lastJobRun: string
}

export interface AtRiskCustomers {
    id: string
    name: string
    email: string
    activeFailures: number
    totalAtRisk: number
    lastFailedAt: string
}

export interface TopOpportunities {
  id: string
  email: string
  name: string
  totalAtRisk: number
  activeFailures: number
  lastFailedAt: string
  score: number
  topCaseId: string
}

export interface ResendVerificationSuccess {
    success: boolean
    message: string
    alreadyVerified?: boolean
}

export interface ForgotPasswordSuccess {
    success: boolean
    message: string
}

export interface ApiError {
    success: boolean
    message: string
}

export interface ApiErrorResponse {
    success: false
    message: string
    code?: string
}

export const AUTH_ERRORS = {
    EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
    RESET_TOKEN_INVALID: "RESET_TOKEN_INVALID",
    RESET_TOKEN_EXPIRED: "RESET_TOKEN_EXPIRED",
    PASSWORD_SAME_AS_CURRENT: "PASSWORD_SAME_AS_CURRENT",
    CURRENT_PASSWORD_WRONG: "CURRENT_PASSWORD_WRONG",

}

export interface ResetPasswordRequest {
    token: string
    password: string
}

export interface ChangePasswordRequest {
    currentPassword: string
    newPassword: string
}

