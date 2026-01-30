import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    '/api/webhook',
]);

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/course/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    // Allow webhook route to bypass authentication
    if (isPublicRoute(req)) {
        return;
    }

    if (isProtectedRoute(req)) {
        // In Clerk v6, the auth object is passed directly to the middleware.
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
