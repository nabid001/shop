import BestSeller from "@/features/home/components/BestSeller";
import CategoryGrid from "@/features/home/components/CategoryGrid";
import Featured from "@/features/home/components/Featured";
import NewArrival from "@/features/home/components/NewArrival";
import HeroCarousel from "@/features/home/components/HeroCarousel";

const Home = async () => {
  // const products = await getProducts();

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
