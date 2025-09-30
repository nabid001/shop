import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { X, Check, Clock, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function ShoppingCart() {
  const inStock = true;
  const size = true;

  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* map on the cart form here on */}
          <Card className="p-4 lg:p-6 bg-cart-product-bg border-cart-product-border">
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={"/product/shirt-img.jpg"}
                  alt={"name"}
                  className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-grow min-w-0 pr-2">
                    <h3 className="text-base lg:text-lg font-semibold text-foreground truncate">
                      Shirt
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-1">
                      <span>Black</span>
                      {size && <span>M</span>}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground p-1 flex-shrink-0"
                  >
                    <X className="h-4 w-4 lg:h-5 lg:w-5" />
                  </Button>
                </div>

                <p className="text-base lg:text-lg font-semibold text-foreground mb-3">
                  600 Taka
                </p>

                {/* Quantity and Status */}
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                  <Select>
                    <SelectTrigger className="w-20 lg:w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Status Indicators */}
                  <div className="flex items-center gap-2">
                    {inStock ? (
                      <>
                        <Check className="h-4 w-4 text-green-500/70 flex-shrink-0" />
                        <span className="text-sm font-medium text-green-500/70">
                          In stock
                        </span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          Ships in 3-4 weeks
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Order summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">600 Taka</span>
              </div>

              <div className="flex justify-between text-base">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    Shipping estimate
                  </span>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="font-medium text-foreground">50 Taka</span>
              </div>

              {/* <div className="flex justify-between text-base">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Tax estimate</span>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                </div> */}

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Order total</span>
                  <span className="text-foreground">650 Taka</span>
                </div>
              </div>

              <Button variant={"outline"} className="w-full">
                Checkout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
