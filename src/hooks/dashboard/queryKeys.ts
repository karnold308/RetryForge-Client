export const dashboardKeys = {
    overview: ['dashboard', 'overview'] as const,
    recentRecoveries: ['dashboard', 'recentRecoveries'] as const,
    systemStatus: ['dashboard', 'systemStatus'] as const,
    topOpportunities: ['dashboard', 'topOpportunities'] as const,
    analytics: ['dashboard', 'analytics'] as const,
    customers: ['dashboard', 'customers'] as const,
    recoveries: ['dashboard', 'recoveries'] as const,
    recoveryDetails: (id: string) => ["dashboard", "recovery", id] as const,
}