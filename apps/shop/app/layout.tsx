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

const ClerkRapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      dynamic
      afterSignOutUrl={"/"}
      signInFallbackRedirectUrl={"/sign-in"}
      signUpFallbackRedirectUrl={"/sign-in"}
    >
      {children}
    </ClerkProvider>
  );
};

export const metadata: Metadata = {
  title: {
    default: "Luxe Store",
    template: "%s | Luxe Store",
  },
  description: "Best online store to find your favorite clothes.",
  keywords: ["ecommerce", "fashion", "clothing", "store", "shopping"],
  openGraph: {
    title: "Luxe Store",
    description: "Best online store to find your favorite clothes.",
    url: "https://your-domain.com",
    siteName: "Luxe Store",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Store",
    description: "Best online store to find your favorite clothes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={"loading..."}>
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
