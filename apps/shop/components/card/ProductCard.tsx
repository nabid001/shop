import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";
import { blurUrl, imgUrl } from "@/lib/utils";

type TProductCart = {
  name: string;
  imageUrl: string;
  slug: string;
  price: number;
  salePrice?: number;
  category: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
};

const ProductCard = ({
  imageUrl,
  name,
  slug,
  price,
  salePrice,
  category,
  isBestSeller,
  isNewArrival,
  isFeatured,
}: TProductCart) => {
  return (
    <Card className="group cursor-pointer border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg bg-card">
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Product Image */}
        <div className="aspect-square bg-muted/30 overflow-hidden">
          <Image
            src={imgUrl(imageUrl)}
            blurDataURL={blurUrl(imageUrl)}
            alt={name}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* New Badge */}
        {isNewArrival && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          </div>
        )}

        {isBestSeller && (
          <div className="absolute top-3 left-3">
            <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
              Best Seller
            </span>
          </div>
        )}

        {isFeatured && (
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
            Sale
          </span>
        )}
      </div>

      {/* Product Info */}

      <Link href={`/products/${slug}`} className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {category}
        </p>
        <h3 className="font-medium text-foreground mb-2 text-balance">
          {name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">
            ${salePrice}
          </span>
          {(isBestSeller || isFeatured) && price && (
            <span className="text-sm text-muted-foreground line-through">
              ${price}
            </span>
          )}
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;
