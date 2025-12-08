"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCheckoutSuccessStore } from "@/features/checkout-success/store";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

const CheckoutSuccess = () => {
  const { checkoutId } = useCheckoutSuccessStore();

  if (!checkoutId) return notFound();

  return (
    <main className="product-container">
      {/* <SuccessContent /> */}
      <div className="text-center mb-12">
        <div className={`flex justify-center mb-6 transition-all duration-700`}>
          <div className="relative">
            <CheckCircle2 className="h-20 w-20 " />
            {/* <div className="absolute inset-0 animate-pulse">
              <CheckCircle2 className="h-20 w-20" />
            </div> */}
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-light text-foreground mb-3 text-balance">
          Order Confirmed!
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          Thank you for your purchase
        </p>
        {/* <p className="text-sm text-muted-foreground">
          A confirmation email has been sent to your email address
        </p> */}
        <p className="text-sm text-muted-foreground">
          Order Number: {checkoutId}
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild variant={"outline"}>
            <Link href="/profile">View Order</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
