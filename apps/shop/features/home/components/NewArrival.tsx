import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { getNewArrival } from "@/sanity/actions/actions";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@repo/sanity-config/image";
import { blurUrl } from "@/lib/utils";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {res.map((product) => (
        <Card
          key={product._id}
          className="group cursor-pointer border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg bg-card"
        >
          <div className="relative overflow-hidden rounded-t-lg">
            {/* Product Image */}
            <div className="aspect-square bg-muted/30 overflow-hidden">
              <Image
                src={urlFor(product.image.url).url()}
                blurDataURL={blurUrl(product.image.url)}
                alt={product.name}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* New Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                New
              </span>
            </div>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm hover:bg-accent/80 opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <Heart className="h-4 w-4" />
            </Button>

            {/* Quick Add Button */}
            <Button className="absolute bottom-3 left-3 right-3 bg-primary/90 hover:bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h3 className="font-medium text-foreground mb-2 text-balance">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">
                ${product.price}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
