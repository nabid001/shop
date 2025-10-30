import BestSeller from "@/features/home/components/BestSeller";
import CategoryGrid from "@/features/home/components/CategoryGrid";
import Featured from "@/features/home/components/Featured";
import NewArrival from "@/features/home/components/NewArrival";
import HeroCarousel from "@/features/home/components/HeroCarousel";
import { getFeatured, getHeroBanner } from "@/features/home/db/actions";
import { Suspense } from "react";

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
