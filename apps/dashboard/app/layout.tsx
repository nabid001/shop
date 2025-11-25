import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { dark } from "@clerk/themes";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ClerkRapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      dynamic
      afterSignOutUrl={"/sign-in"}
      appearance={{
        theme: [dark],
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Spinner />}>
      <ClerkRapper>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
          >
            {children}
          </body>
        </html>
      </ClerkRapper>
    </Suspense>
  );
}
