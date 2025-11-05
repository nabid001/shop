"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthSync() {
  const { isSignedIn, isLoaded, sessionClaims } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!isLoaded || isSyncing) return;

    const main = async () => {
      if (sessionClaims?.userId) {
        router.push("/");
        return;
      }

      setIsSyncing(true);
      try {
        const res = await fetch("/api/sync-user", { method: "POST" });
        if (!res.ok) throw new Error("Failed to sync user");

        await user?.reload();
        router.push("/");
      } catch (err) {
        console.error("Sync error:", err);
        setError("Something went wrong while syncing your account.");
        setIsSyncing(false);
      }
    };

    main();
  }, [isLoaded, isSignedIn]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Something went wrong!</h1>
          <Button variant={"outline"} onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-300 mx-auto mb-4"></div>
        <h2 className="text-xl sm:text-2xl font-medium">
          Syncing your account...
        </h2>
      </div>
    </div>
  );
}
