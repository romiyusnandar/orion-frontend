// Maintenance Mode Middleware
// This middleware redirects all requests to the maintenance page when maintenance mode is enabled

import { defineMiddleware } from "astro:middleware";
import { isMaintenanceMode, isWhitelistedPath } from "./utils/maintenance";

export const onRequest = defineMiddleware(async (context, next) => {
    const { url, redirect } = context;
    const pathname = url.pathname;

    // Check if maintenance mode is enabled
    if (isMaintenanceMode()) {
        // Allow access to whitelisted paths
        if (isWhitelistedPath(pathname)) {
            return next();
        }

        // Redirect to maintenance page
        if (pathname !== "/maintenance") {
            return redirect("/maintenance", 307); // 307 = Temporary Redirect
        }
    } else {
        // If maintenance mode is disabled, prevent direct access to maintenance page
        if (pathname === "/maintenance") {
            return redirect("/", 302);
        }
    }

    // Continue with normal request
    return next();
});
