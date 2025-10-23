import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

const ConsumerLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />
      </main>
      <Footer />
    </main>
  );
};

export default ConsumerLayout;
