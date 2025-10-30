import { Button } from "@/components/ui/button";
import { getBestseller } from "@/features/home/db/actions";
import { Suspense } from "react";
import ProductCard from "@/components/card/ProductCard";

export function BestSeller() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4 text-balance">
            Best Sellers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Customer favorites that have earned their place in your wardrobe
          </p>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<h3>Loading Bestseller...</h3>}>
          <ProductGrid />
        </Suspense>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 bg-transparent"
          >
            View All Best Sellers
          </Button>
        </div>
      </div>
    </section>
  );
}
export default BestSeller;

const ProductGrid = async () => {
  const res = await getBestseller();
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
          imageUrl={product.image}
          isBestSeller={true}
        />
      ))}
    </div>
  );
};
