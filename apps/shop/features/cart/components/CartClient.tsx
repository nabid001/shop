"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  size: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 29,
    image: "/classic-white-cotton-t-shirt-on-hanger.jpg",
    category: "T-Shirts",
    quantity: 2,
    size: "M",
  },
  {
    id: 2,
    name: "Premium Dress Shirt",
    price: 89,
    image: "/elegant-white-dress-shirt-folded.jpg",
    category: "Shirts",
    quantity: 1,
    size: "L",
  },
  {
    id: 3,
    name: "Slim Fit Chinos",
    price: 79,
    image: "/khaki-chino-pants-folded.jpg",
    category: "Pants",
    quantity: 1,
    size: "32",
  },
];

export function CartClient() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10");
    } else {
      setAppliedPromo(null);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = appliedPromo === "SAVE10" ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-12 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-light text-foreground mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Add some items to get started
          </p>
          <Link href="/products">
            <Button>
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-light text-foreground mb-2 text-balance">
          Shopping Cart
        </h1>
        <p className="text-muted-foreground text-pretty">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
          cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-4 sm:p-6">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-muted/30 rounded-lg overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-medium text-foreground mb-1 text-balance">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="flex-shrink-0 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
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
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${item.price} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Continue Shopping Button - Mobile */}
          <Link href="/products" className="block lg:hidden">
            <Button variant="outline" className="w-full bg-transparent">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-medium text-foreground mb-6">
              Order Summary
            </h2>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Promo Code
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={applyPromoCode}
                  className="bg-transparent"
                >
                  Apply
                </Button>
              </div>
              {appliedPromo && (
                <p className="text-sm text-green-600 mt-2">
                  Promo code "{appliedPromo}" applied successfully!
                </p>
              )}
            </div>

            <Separator className="my-6" />

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600 font-medium">
                    -${discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground font-medium">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="text-foreground font-medium">
                  ${tax.toFixed(2)}
                </span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-foreground">Total</span>
              <span className="text-2xl font-semibold text-foreground">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <Button className="w-full mb-3">
              Proceed to Checkout
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            {/* Continue Shopping - Desktop */}
            <Link href="/products" className="hidden lg:block">
              <Button variant="outline" className="w-full bg-transparent">
                Continue Shopping
              </Button>
            </Link>

            {/* Free Shipping Notice */}
            {shipping > 0 && (
              <p className="text-xs text-muted-foreground text-center mt-4">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
