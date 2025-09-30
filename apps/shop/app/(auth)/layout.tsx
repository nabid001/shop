import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      {children}
    </main>
  );
};

export default AuthLayout;
