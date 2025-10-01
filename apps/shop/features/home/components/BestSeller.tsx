import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

const bestSellerProducts: Product[] = [
  {
    id: 1,
    name: "Classic Oxford Shirt",
    price: 79,
    originalPrice: 95,
    image: "/classic-white-oxford-dress-shirt.jpg",
    category: "Shirts",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Dark Wash Jeans",
    price: 89,
    originalPrice: 110,
    image: "/dark-wash-denim-jeans-folded.jpg",
    category: "Pants",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 3,
    name: "Navy Polo Shirt",
    price: 55,
    image: "/navy-blue-polo-shirt-on-hanger.jpg",
    category: "Shirts",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 4,
    name: "Cargo Pants",
    price: 95,
    originalPrice: 120,
    image: "/khaki-cargo-pants-folded.jpg",
    category: "Pants",
    rating: 4.6,
    reviews: 73,
  },
];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellerProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg bg-card"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                {/* Product Image */}
                <div className="aspect-square bg-muted/30 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Best Seller Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                    Best Seller
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

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-foreground">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

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
