import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = await auth();
  if (isAuthenticated) redirect("/");
  return (
    <main className="flex items-center justify-center min-h-screen">
      {children}
    </main>
  );
};

export default AuthLayout;
