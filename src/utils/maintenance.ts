// Maintenance Mode Utility
// This file controls the maintenance mode status

export const MAINTENANCE_CONFIG = {
    // Set this to true to enable maintenance mode
    enabled: false,

    // Optional: Set specific time when maintenance will end
    estimatedEndTime: null, // e.g., "2025-12-15T16:00:00+07:00"

    // Optional: Custom message
    message: "We're currently performing system maintenance to improve performance and service quality.",

    // Whitelist IPs that can bypass maintenance mode (optional)
    whitelistedIPs: [] as string[],

    // Whitelist paths that should be accessible during maintenance
    whitelistedPaths: [
        "/maintenance",
        "/api/health", // If you have health check endpoint
    ] as string[],
};

/**
 * Check if maintenance mode is active
 */
export function isMaintenanceMode(): boolean {
    return MAINTENANCE_CONFIG.enabled;
}

/**
 * Check if a path should be accessible during maintenance
 */
export function isWhitelistedPath(path: string): boolean {
    return MAINTENANCE_CONFIG.whitelistedPaths.some(whitelistedPath =>
        path.startsWith(whitelistedPath)
    );
}

/**
 * Check if an IP is whitelisted
 */
export function isWhitelistedIP(ip: string): boolean {
    return MAINTENANCE_CONFIG.whitelistedIPs.includes(ip);
}

/**
 * Get maintenance status info
 */
export function getMaintenanceInfo() {
    return {
        enabled: MAINTENANCE_CONFIG.enabled,
        message: MAINTENANCE_CONFIG.message,
        estimatedEndTime: MAINTENANCE_CONFIG.estimatedEndTime,
    };
}
