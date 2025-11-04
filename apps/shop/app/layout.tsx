import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { Toaster } from "sonner";

import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  weight: ["200", "400", "600", "700", "800"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: ["200", "400", "600", "700", "800"],
  subsets: ["latin"],
});

const ClerkRapper = async ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider dynamic afterSignOutUrl={"/"}>
      {children}
    </ClerkProvider>
  );
};

export const metadata: Metadata = {
  title: "Consumer Area",
  description: "Consumer area of the e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback="Clerk Loading...">
      <ClerkRapper>
        <html lang="en">
          <body
            className={`${geist.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <Toaster />
          </body>
        </html>
      </ClerkRapper>
    </Suspense>
  );
}
