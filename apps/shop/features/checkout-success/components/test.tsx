"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  category: string;
}

const mockOrderItems: OrderItem[] = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 29,
    quantity: 2,
    size: "M",
    category: "T-Shirts",
  },
  {
    id: 2,
    name: "Premium Dress Shirt",
    price: 89,
    quantity: 1,
    size: "L",
    category: "Shirts",
  },
];

export function SuccessContent() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const orderNumber =
    "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const estimatedDelivery = new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const subtotal = mockOrderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 10;
  const tax = (subtotal + shipping) * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div
          className={`flex justify-center mb-6 transition-all duration-700 ${isAnimated ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
        >
          <div className="relative">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
            <div className="absolute inset-0 animate-pulse">
              <CheckCircle2 className="h-20 w-20 text-green-500 opacity-30" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-light text-foreground mb-3 text-balance">
          Order Confirmed!
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          Thank you for your purchase
        </p>
        <p className="text-sm text-muted-foreground">
          A confirmation email has been sent to your email address
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Details Card */}
          <Card className="p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Order Number
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {orderNumber}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Order Date
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {orderDate}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Estimated Delivery
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {estimatedDelivery}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Status
                </p>
                <p className="text-lg font-semibold text-green-600">
                  Processing
                </p>
              </div>
            </div>
          </Card>

          {/* Order Items */}
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-medium text-foreground mb-6">
              Order Items
            </h2>
            <div className="space-y-4">
              {mockOrderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center pb-4 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-medium text-foreground mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Shipping & Billing Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Shipping Address
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                John Doe
                <br />
                123 Main Street
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-medium text-foreground mb-4">
                Billing Address
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Same as shipping address
              </p>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="p-6 sm:p-8 bg-primary/3 border-primary/20">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              What's Next?
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-semibold">1.</span>
                <span>
                  Check your email for an order confirmation and tracking
                  information
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold">2.</span>
                <span>
                  Your order will be processed and shipped within 1-2 business
                  days
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold">3.</span>
                <span>
                  You'll receive a shipping notification with tracking details
                </span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h3 className="text-lg font-medium text-foreground mb-6">
              Order Total
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground font-medium">
                  ${shipping.toFixed(2)}
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

            <div className="flex justify-between items-center mb-8">
              <span className="font-medium text-foreground">Total</span>
              <span className="text-2xl font-semibold text-foreground">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" asChild>
                <Link href="/products">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                asChild
              >
                <Link href="/">Back to Home</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-border space-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Order secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Free returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email support</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
