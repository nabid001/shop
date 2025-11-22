import BestSeller from "@/features/home/components/BestSeller";
import CategoryGrid from "@/features/home/components/CategoryGrid";
import Featured from "@/features/home/components/Featured";
import NewArrival from "@/features/home/components/NewArrival";
import HeroCarousel from "@/features/home/components/HeroCarousel";
import { getFeatured, getHeroBanner } from "@/features/home/db/actions";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  // metadataBase: new URL("https://luxestore.com"),

  title: "Luxe Store — Premium Fashion, Accessories & Lifestyle",
  description:
    "Shop the latest fashion trends, premium accessories, and lifestyle essentials at Luxe Store. Explore best sellers, new arrivals, and exclusive collections.",

  keywords: [
    "Luxe Store",
    "online store",
    "fashion",
    "ecommerce",
    "accessories",
    "new arrivals",
    "best sellers",
    "premium fashion",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Luxe Store — Premium Fashion, Accessories & Lifestyle",
    description:
      "Discover premium fashion, accessories, and lifestyle products. Shop best sellers, new arrivals, and exclusive collections at Luxe Store.",
    url: "https://luxestore.com",
    siteName: "Luxe Store",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Luxe Store Homepage",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Luxe Store — Premium Fashion & Lifestyle",
    description:
      "Explore trending fashion, accessories, and lifestyle products at Luxe Store.",
    images: ["/og/home.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  applicationName: "Luxe Store",
  category: "ecommerce",
};

const Home = () => {
  const bannerPromise = getHeroBanner();
  const featuredPromise = getFeatured();

  return (
    <main className="">
      <Suspense fallback={<h3>Loading Banner...</h3>}>
        <HeroCarousel heroBannerPromise={bannerPromise} />
      </Suspense>

      <Suspense fallback={<h3>Loading Categories...</h3>}>
        <CategoryGrid />
      </Suspense>

      <Suspense fallback={<h3>Loading New Arrivals...</h3>}>
        <NewArrival />
      </Suspense>

      <Suspense fallback={<h3>Loading Featured...</h3>}>
        <Featured featuredPromise={featuredPromise} />
      </Suspense>

      <Suspense fallback={<h3>Loading Best Sellers...</h3>}>
        <BestSeller />
      </Suspense>
    </main>
  );
};

export default Home;
