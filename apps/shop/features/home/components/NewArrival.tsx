import Link from "next/link";
import ProductCard from "@/components/card/ProductCard";
import { Button } from "@/components/ui/button";
import { getNewArrival } from "@/features/home/db/actions";
import { Suspense } from "react";

const NewArrival = () => {
  return (
    <section className="component-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4 text-balance">
            New Arrivals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Fresh styles just landed. Be the first to discover our latest
            collection
          </p>
        </div>

        {/* Products Grid */}
        <Suspense>
          <ProductsGrid />
        </Suspense>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 bg-transparent"
            asChild
          >
            <Link href={"#"}>View All New Arrivals</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;

const ProductsGrid = async () => {
  const res = await getNewArrival();

  return (
    <div className="product-card">
      {res.map((product) => (
        <ProductCard
          key={product._id}
          name={product.name}
          slug={product.slug.current}
          price={product.price}
          salePrice={product.salePrice}
          category={product.category}
          imageUrl={product.image.url}
          isNewArrival={true}
        />
      ))}
    </div>
  );
};
