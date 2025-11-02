"use client";

import { TProductById } from "@/types";
import { useEffect, useState } from "react";
import { CarouselImage } from "./CarouselImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { calculateDiscount } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { addToCart } from "../db/cart";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { PortableText } from "@portabletext/react";
import { PortableTextComponent } from "./PortableComponent";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

type Props = {
  product: Awaited<TProductById>;
  userId: string;
};

const ProductDetailsClient = ({ product, userId }: Props) => {
  const {
    _id,
    slug,
    name,
    category,
    featured,
    shortDescription,
    longDescription,
    newArrival,
    variants,
  } = product;

  const [color, setColor] = useState(variants.color[0] || "");
  const [size, setSize] = useState(variants.size[0] || "");
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const images = variants?.imageGallery?.map((variant) => variant);
  // const [singleVariant] = variants.filter((v) => v.color === color);

  useEffect(() => {
    if (quantity > variants.stock) {
      setQuantity(variants.stock);
    }
  }, [quantity, variants.stock]);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => prevQuantity + delta);
  };

  const handleAddToCart = async () => {
    setIsSubmitting(true);

    const res = await addToCart({
      userId,
      color: color,
      size: size,
      productId: _id,
      quantity,
      priceAtAdd: variants.salePrice,
    });

    if (!res.success) {
      setIsSubmitting(false);
      toast.error(res.message);
    } else if (res.success) {
      setIsSubmitting(false);
      toast.success(res.message);
    }
  };

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mb-16">
        <CarouselImage imageGallery={images} mainImage={variants.image} />

        {/* Product Details */}
        <div className="space-y-6 flex flex-col">
          {/* Badges */}
          <div className="flex gap-3">
            {newArrival && <Badge variant={"secondary"}>New Arrival</Badge>}
            {featured && (
              <Badge variant={"outline"} className="bg-accent border-accent">
                Featured
              </Badge>
            )}
            {variants.stock > 0 ? (
              <Badge
                className={`border-green-500 text-green-600 ${variants.stock < 5 && "text-red-400 border border-red-300"}`}
                variant={"outline"}
              >
                {variants.stock > 5 ? "In Stock" : `${variants.stock} Left`}
              </Badge>
            ) : (
              <Badge
                className="border-red-500 text-red-600"
                variant={"outline"}
              >
                Stock Out
              </Badge>
            )}
          </div>

          <div className="mt-7 space-y-2.5">
            <p className="text-muted-foreground text-xs">
              {category.name.toUpperCase()}
            </p>
            <h1 className="product-heading-text">{name}</h1>
            <div className="flex gap-3 items-center justify-start">
              <h2 className="sale-price">৳{variants.salePrice}</h2>
              <h2 className="regular-price">৳{variants.price}</h2>
              <Badge variant={"secondary"}>
                Save {calculateDiscount(variants.price, variants.salePrice)}%
              </Badge>
            </div>
          </div>

          {/* Color */}
          <div className="flex items-center gap-7">
            <div className="space-y-1.5 ">
              <p className="text-mute">Color: {color}</p>
              <div className="flex gap-3">
                {variants.color.map((col, i) => (
                  <Button
                    key={i}
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => setColor(col)}
                    className={`border border-accent ${color === col && "bg-accent"} text-black/80`}
                  >
                    {col}
                  </Button>
                ))}
              </div>
            </div>
            {/* Size */}
            <div className="space-y-1.5">
              <p className="text-mute">Size: {size}</p>
              <div className="flex gap-3">
                {variants.size.map((item, i) => (
                  <Button
                    key={i}
                    variant={"ghost"}
                    size={"sm"}
                    disabled={variants.stock === 0}
                    onClick={() => setSize(item)}
                    className={`border border-accent ${size === item && "bg-accent"} text-black/80`}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-1.5">
            <p className="text-mute">Quantity</p>
            <div className="flex items-center">
              <Button
                size="sm"
                variant="outline"
                disabled={quantity <= 1}
                className="size-5"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus className="h-1 w-1" />
              </Button>
              <span className="product-quantity">{quantity}</span>
              <Button
                size="sm"
                variant="outline"
                className="size-5"
                disabled={quantity >= variants.stock}
                onClick={() =>
                  handleQuantityChange(variants.stock > quantity ? 1 : 0)
                }
              >
                <Plus className="h-1 w-1" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-auto">
            <SignedIn>
              <Button
                onClick={() => {
                  handleAddToCart();
                }}
                variant={`${variants.stock <= 0 ? "destructive" : "default"}`}
                disabled={variants.stock <= 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Adding
                  </>
                ) : (
                  <>{variants.stock > 0 ? "Add To Cart" : "Out Of Stock"}</>
                )}
              </Button>
            </SignedIn>
            <SignedOut>
              <Button asChild>
                <SignInButton mode="redirect">Add To Cart</SignInButton>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
      <div className="mt-11">
        <h2 className="text-2xl font-medium">Description</h2>
        <Separator className="my-2" />
        <PortableText
          value={longDescription}
          components={PortableTextComponent}
        />
      </div>
    </>
  );
};

export default ProductDetailsClient;
