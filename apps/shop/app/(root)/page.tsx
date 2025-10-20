import BestSeller from "@/features/home/components/BestSeller";
import CategoryGrid from "@/features/home/components/CategoryGrid";
import Featured from "@/features/home/components/Featured";
import NewArrival from "@/features/home/components/NewArrival";
import HeroCarousel from "@/features/home/components/HeroCarousel";
import { Suspense } from "react";
import { getFeatured, getHeroBanner } from "@/features/home/db/actions";

const Home = async () => {
  const bannerPromise = getHeroBanner();
  const featuredPromise = getFeatured();

  return (
    <main className="">
      <Suspense fallback={<h3>Loading Banner...</h3>}>
        <HeroCarousel heroBannerPromise={bannerPromise} />
      </Suspense>

      <CategoryGrid />

      <NewArrival />

      <Featured featuredPromise={featuredPromise} />

      <BestSeller />
    </main>
  );
};

export default Home;
