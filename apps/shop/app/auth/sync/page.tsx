"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SyncPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleSync() {
      // Wait for Clerk to load
      if (!isLoaded) return;

      // Not authenticated - redirect to sign in
      if (!user) {
        router.push("/sign-in");
        return;
      }

      // Already synced - redirect to destination
      if (user.publicMetadata?.userId) {
        const redirectTo = searchParams.get("redirectTo") || "/";
        router.push(redirectTo);
        return;
      }

      // Prevent multiple sync attempts
      if (isSyncing) return;
      setIsSyncing(true);

      try {
        // Call server action to sync user
        const response = await fetch("/api/clerk/sync-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to sync user");
        }

        // This updates the publicMetadata on the client side
        await user.reload();

        // Redirect to destination
        const redirectTo = searchParams.get("redirectTo") || "/";
        window.location.href = redirectTo;
      } catch (err) {
        console.error("Sync error:", err);
        setError("Failed to set up your account. Please try again.");
        setIsSyncing(false);
      }
    }

    handleSync();
  }, [user, isLoaded, router, searchParams, isSyncing]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
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
          <p className="text-red-600 mb-4 font-medium">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setIsSyncing(false);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center p-8 rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black/10 mx-auto mb-6"></div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Setting up your account
        </h2>
        <p className="text-gray-600">This will only take a moment...</p>
      </div>
    </div>
  );
}
