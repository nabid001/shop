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

  const [color, setColor] = useState(variants[0].color || "");
  const [size, setSize] = useState(variants[0].size[0] || "");
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const images = variants.map((variant) => variant.image);
  const [singleVariant] = variants.filter((v) => v.color === color);

  useEffect(() => {
    if (quantity > singleVariant.stock) {
      setQuantity(singleVariant.stock);
    }
  }, [quantity, singleVariant.stock]);

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
      priceAtAdd: singleVariant.salePrice,
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
        <CarouselImage images={images} />

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
            {singleVariant.stock > 0 ? (
              <Badge
                className={`border-green-500 text-green-600 ${singleVariant.stock < 5 && "text-red-400 border border-red-300"}`}
                variant={"outline"}
              >
                {singleVariant.stock > 5
                  ? "In Stock"
                  : `${singleVariant.stock} Left`}
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
              <h2 className="sale-price">৳{singleVariant.salePrice}</h2>
              <h2 className="regular-price">৳{singleVariant.price}</h2>
              <Badge variant={"secondary"}>
                Save{" "}
                {calculateDiscount(
                  singleVariant.price,
                  singleVariant.salePrice
                )}
                %
              </Badge>
            </div>
          </div>

          {/* Color */}
          <div className="flex items-center gap-7">
            <div className="space-y-1.5 ">
              <p className="text-mute">Color: {color}</p>
              <div className="flex gap-3">
                {variants.map((item, i) => (
                  <Button
                    key={i}
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => setColor(item.color)}
                    className={`border border-accent ${color === item.color && "bg-accent"} text-black/80`}
                  >
                    {item.color}
                  </Button>
                ))}
              </div>
            </div>
            {/* Size */}
            <div className="space-y-1.5">
              <p className="text-mute">Size: {size}</p>
              <div className="flex gap-3">
                {singleVariant.size.map((item, i) => (
                  <Button
                    key={i}
                    variant={"ghost"}
                    size={"sm"}
                    disabled={singleVariant.stock === 0}
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
                disabled={quantity >= singleVariant.stock}
                onClick={() =>
                  handleQuantityChange(singleVariant.stock > quantity ? 1 : 0)
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
                variant={`${singleVariant.stock <= 0 ? "destructive" : "default"}`}
                disabled={singleVariant.stock <= 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Adding
                  </>
                ) : (
                  <>
                    {singleVariant.stock > 0 ? "Add To Cart" : "Out Of Stock"}
                  </>
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
