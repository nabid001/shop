"use client";

import { Button } from "@/components/ui/button";
import { useUrlStore } from "@/lib/setPathname";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AuthSync() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const { currentUrlPath } = useUrlStore();

  // ✅ Prevent multiple executions with ref
  const hasRun = useRef(false);

  useEffect(() => {
    // ✅ Prevent running multiple times
    if (hasRun.current) return;

    // Don't do anything until Clerk is fully loaded
    if (!isLoaded) return;

    // Wait for user object to be available
    if (!user) {
      // If loaded but no user after 2 seconds, something went wrong
      const timer = setTimeout(() => {
        if (!user) {
          setError("Session not found. Please sign in again.");
        }
      }, 500);
      return () => clearTimeout(timer);
    }

    const main = async () => {
      // Mark as running
      hasRun.current = true;

      try {
        // ✅ Check metadata from user object
        if (user.publicMetadata?.userId) {
          const redirectTo = searchParams.get("redirectTo") || "/";
          window.location.href = redirectTo;
          return;
        }

        // ✅ Prevent re-running if already syncing
        if (isSyncing) return;
        setIsSyncing(true);

        const res = await fetch("/api/sync-user", { method: "POST" });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to sync user");
        }

        // ✅ Reload user to get updated metadata
        await user.reload();

        // ✅ Use window.location for hard redirect
        // const redirectTo = searchParams.get("redirectTo") || "/";
        window.location.href = currentUrlPath ? currentUrlPath : "/";
      } catch (err) {
        console.error("Sync error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while syncing your account."
        );
        hasRun.current = false; // Allow retry
        setIsSyncing(false);
      }
    };

    main();
  }, [isLoaded, user, searchParams, isSyncing]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md px-4">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-red-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold mb-2">Something went wrong!</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                hasRun.current = false;
                setError(null);
                setIsSyncing(false);
              }}
            >
              Try Again
            </Button>
            <Button variant="default" onClick={() => router.push("/sign-in")}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
          Setting up your account
        </h2>
        <p className="text-gray-500 text-sm">This will only take a moment...</p>
      </div>
    </div>
  );
}
