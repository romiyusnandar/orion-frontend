// Route protection utility
// Add this script to admin pages that should be admin-only

export function protectAdminRoute() {
    const authUser = localStorage.getItem("auth_user");
    if (authUser) {
        try {
            const user = JSON.parse(authUser);
            const adminRoles = ['ADMIN', 'FOUNDER', 'CO_FOUNDER'];

            // If not admin, redirect to contributor dashboard
            if (!adminRoles.includes(user.role)) {
                window.location.href = '/admin/contributor';
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error checking user role:', error);
            window.location.href = '/admin/login';
            return false;
        }
    } else {
        window.location.href = '/admin/login';
        return false;
    }
}

// Inline script version for use in Astro pages
export const PROTECT_ADMIN_ROUTE_SCRIPT = `
(function() {
    const authUser = localStorage.getItem("auth_user");
    if (authUser) {
        try {
            const user = JSON.parse(authUser);
            const adminRoles = ['ADMIN', 'FOUNDER', 'CO_FOUNDER'];
            
            if (!adminRoles.includes(user.role)) {
                window.location.href = '/admin/contributor';
            }
        } catch (error) {
            console.error('Error checking user role:', error);
            window.location.href = '/admin/login';
        }
    } else {
        window.location.href = '/admin/login';
    }
})();
`;
