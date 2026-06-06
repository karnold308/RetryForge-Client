import type { NavItem } from '../models/types'

export const dashboardNav: NavItem[] = [
    { label: "Dashboard", path: "/dashboard", exact: true },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Recoveries", path: "/dashboard/recoveries" },
    { label: "Customers", path: "/dashboard/customers" },
    { label: "Settings", path: "/dashboard/settings" },
];