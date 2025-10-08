import BestSeller from "@/features/home/components/BestSeller";
import CategoryGrid from "@/features/home/components/CategoryGrid";
import Featured from "@/features/home/components/Featured";
import NewArrival from "@/features/home/components/NewArrival";
import HeroCarousel from "@/features/home/components/HeroCarousel";
import { getHeroBanner } from "@/sanity/actions/heroBanner";
import { urlFor } from "@repo/sanity-config/image";
import Image from "next/image";

const Home = async () => {
  // const res = await getHeroBanner();
  // console.log(res);
  return (
    <main className="">
      <HeroCarousel />

      <CategoryGrid />

      <NewArrival />

      <Featured />

      <BestSeller />
    </main>
  );
};

export default Home;
