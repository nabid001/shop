import BestSeller from "@/features/home/components/BestSeller";
import CategoryGrid from "@/features/home/components/CategoryGrid";
import Featured from "@/features/home/components/Featured";
import NewArrival from "@/features/home/components/NewArrival";
import HeroCarousel from "@/features/home/components/HeroCarousel";
import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import console from "console";
import { auth } from "@clerk/nextjs/server";
import { useId } from "react";

const Home = () => {
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
