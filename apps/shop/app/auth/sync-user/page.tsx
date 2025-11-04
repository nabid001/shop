"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
//   const { userId, sessionClaims } = await auth();

//   if (userId !== null && sessionClaims.userId == null) {
//     const res = await getOrCreate({ clerkId: userId });
//     console.log(res);

//     return redirect("/");
//   } else {
//     return redirect("/");
//   }

const SyncUser = () => {
  const { user } = useUser();
  const { sessionClaims, userId } = useAuth();
  const router = useRouter();

  if (sessionClaims?.userId != null) router.push("/");
  console.log(sessionClaims?.userId);

  useEffect(() => {
    const main = async () => {
      if (userId != null && sessionClaims?.userId === null) {
        const res = await fetch("/api/test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerkId: userId }),
        });

        if (res.ok) {
          user?.reload();
          router.push("/");
        }
      } else {
        router.push("/");
      }
    };

    main();
  }, []);
};

export default SyncUser;
