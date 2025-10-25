"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TCartProduct } from "@/types";
import Image from "next/image";
import { removeFromCart } from "../db/cart";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/features/checkout/store";

type Props = {
  cartItem: Awaited<TCartProduct>;
  userId: string;
};

export function CartClient({ cartItem, userId }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();
  const { addToCheckout, clearCheckout } = useCheckoutStore();

  useEffect(() => {
    const initial: Record<string, number> = {};
    for (const item of cartItem) {
      initial[item.id] = item.quantity ?? 1;
    }
    setQuantities(initial);
  }, [cartItem]);

  const isAllSelected = useMemo(() => {
    return cartItem.length > 0 && selectedIds.size === cartItem.length;
  }, [cartItem.length, selectedIds]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(cartItem.map((i) => i.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelectOne = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities((q) => ({ ...q, [id]: newQuantity }));
  };

  const selectedItems = useMemo(() => {
    return cartItem.filter((i) => selectedIds.has(i.id));
  }, [cartItem, selectedIds]);

  const subtotal = selectedItems.reduce((sum, item) => {
    const unit = (item.salePrice ?? item.price) || 0;
    const qty = quantities[item.id] ?? item.quantity ?? 1;
    return sum + unit * qty;
  }, 0);

  const shipping = subtotal > 0 ? 50 : 0;
  // const tax = subtotal * 0.08;
  const total = subtotal + shipping;

  const handleRemove = async (productId: string) => {
    setIsDeleting(true);
    const res = await removeFromCart({ userId, productId });
    if (res.success) {
      toast.success("Item Removed From Cart");
      setIsDeleting(false);
    } else {
      toast.error("Failed to remove item from cart");
      setIsDeleting(false);
    }
  };

  const handleCheckout = () => {
    if (selectedIds.size === 0) return;

    clearCheckout();

    selectedItems.forEach((item) => {
      const qty = quantities[item.id] ?? item.quantity ?? 1;
      const price = item.salePrice ?? item.price ?? 0;

      addToCheckout({
        _id: item.productId,
        id: item.id,
        name: item.name,
        category: item.category,
        image: item.image,
        color: item.color,
        size: item.size,
        quantity: qty,
        price,
        totalPrice: qty * price,
      });
    });

    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={isAllSelected}
              onCheckedChange={(v) => toggleSelectAll(Boolean(v))}
            />
            <Label htmlFor="select-all">Select all products</Label>
          </div>
          {cartItem.map((item) => (
            <Card key={item.id} className="p-4 sm:p-6">
              <div className="flex gap-4">
                {/* Product Image */}
                <Link
                  href={`/products/${item.slug}`}
                  className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-muted/30 rounded-lg overflow-hidden"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={"image"}
                    fill
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Checkbox
                          id={`select-${item.id}`}
                          checked={selectedIds.has(item.id)}
                          onCheckedChange={(v) =>
                            toggleSelectOne(item.id, Boolean(v))
                          }
                        />
                        <Label
                          htmlFor={`select-${item.id}`}
                          className="cursor-pointer"
                        >
                          Select
                        </Label>
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-medium text-foreground mb-1 text-balance">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Color: {item.color}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(item.id)}
                      className="flex-shrink-0 hover:text-destructive"
                    >
                      {isDeleting ? (
                        <>
                          <Spinner />
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            (quantities[item.id] ?? item.quantity ?? 1) - 1
                          )
                        }
                        disabled={
                          (quantities[item.id] ?? item.quantity ?? 1) <= 1
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {quantities[item.id] ?? item.quantity ?? 1}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            (quantities[item.id] ?? item.quantity ?? 1) + 1
                          )
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">
                        ৳
                        {(
                          ((item.salePrice ?? item.price) || 0) *
                          (quantities[item.id] ?? item.quantity ?? 1)
                        ).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ৳{(item.salePrice ?? item.price).toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Continue Shopping Button - Mobile */}
          {/* <Link href="/products" className="block lg:hidden">
            <Button variant="outline" className="w-full bg-transparent">
              Continue Shopping
            </Button>
          </Link> */}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="p-5 border rounded-md mt-8 sm:p-6 sticky top-24 space-y-4">
            <h2 className="text-xl font-medium text-foreground mb-6">
              Order Summary
            </h2>
            <Separator className="my-4" />

            {/* Price Breakdown */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal (selected)
                </span>
                <span className="text-foreground font-medium">
                  ৳{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground font-medium">
                  {shipping > 0
                    ? `৳${shipping.toFixed(2)}`
                    : `৳${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-foreground">Total</span>
              <span className="text-2xl font-semibold text-foreground">
                ৳{total.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <Button
              className="w-full mb-3"
              disabled={selectedItems.length === 0}
              onClick={() => handleCheckout()}
              variant={"outline"}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
