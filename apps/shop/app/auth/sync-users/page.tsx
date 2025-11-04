import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId } = await auth();

  const res = await fetch("/api/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clerkId: userId }),
  });

  if (res.ok) {
    return redirect("/");
  }
  return <div>page</div>;
};

export default page;
