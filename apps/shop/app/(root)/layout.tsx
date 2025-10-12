import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

const ConsumerLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </main>
  );
};

export default ConsumerLayout;
