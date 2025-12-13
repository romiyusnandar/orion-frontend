// Role-based Access Control (RBAC) utilities

// Admin roles with full access
export const ADMIN_ROLES = ['ADMIN', 'FOUNDER', 'CO_FOUNDER'];

// Contributor roles with limited access
export const CONTRIBUTOR_ROLES = ['CORE_DEVELOPER', 'MAINTAINER', 'CONTRIBUTOR'];

// Check if user is admin
export function isAdmin(role: string): boolean {
    return ADMIN_ROLES.includes(role);
}

// Check if user is contributor
export function isContributor(role: string): boolean {
    return CONTRIBUTOR_ROLES.includes(role);
}

// Check if user has access to a specific feature
export function hasAccess(role: string, feature: string): boolean {
    // Admins have access to everything
    if (isAdmin(role)) {
        return true;
    }

    // Contributors have limited access
    if (isContributor(role)) {
        const contributorAccess: Record<string, boolean> = {
            'devices.edit': true,
            'devices.add': false,
            'devices.delete': false,
            'builds.view': true,
            'builds.add': true,
            'builds.edit': true,
            'builds.delete': false,
            'announcements.view': true,
            'announcements.add': true,
            'announcements.edit': true,
            'announcements.delete': true,
        };

        return contributorAccess[feature] || false;
    }

    return false;
}

// Get user from localStorage
export function getCurrentUser() {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem('auth_user');
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

// Get user role
export function getUserRole(): string | null {
    const user = getCurrentUser();
    return user?.role || null;
}

// Check if current user has access to feature
export function canAccess(feature: string): boolean {
    const role = getUserRole();
    if (!role) return false;
    return hasAccess(role, feature);
}
