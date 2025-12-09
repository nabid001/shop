import Image from "next/image";
import { SiteHeader } from "@/components/sidebar/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";
import { getOrderById } from "@/features/orders/db/order";
import { OrderActions } from "@/features/orders/components/order-actions";
import { XCircle } from "lucide-react";

const View = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const res = await getOrderById({ id });

  const shipping = 150;
  const amount = res.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = amount + shipping;
  return (
    <SidebarInset>
      <SiteHeader siteName="View" />

      <div className="sm:max-w-5xl w-full mx-auto mt-5 py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-lg">Order Details</h1>
          <OrderActions orderId={res.id} orderStatus={res.orderStatus as any} />
        </div>
        {res.orderStatus === "cancelled" && (
          <div className="mt-4 flex items-start gap-3 rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-destructive">
            <XCircle className="h-5 w-5 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium">Order cancelled</p>
              <p className="text-sm text-destructive/90">
                {res.cancelReason || "This order was cancelled by the admin."}
              </p>
            </div>
          </div>
        )}
        <div className="space-y-10 mt-5">
          {/* User Info */}
          <div className="space-y-3">
            <h3 className="text-md">User Info</h3>

            <div className="p-5 border rounded-md shadow-sm shadow-card sm:p-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>Img</AvatarFallback>
                  <AvatarImage src={res?.user?.picture!} />
                </Avatar>
                <div>
                  <h3>{res?.user.email}</h3>
                  <h5>{res?.user.username}</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <h3 className="text-md">Product Info</h3>
            <div className="p-5 border rounded-md shadow-sm shadow-card sm:p-4">
              <div className="space-y-3">
                {res.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 justify-between items-center"
                  >
                    <div className="relative flex gap-3 items-center">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={90}
                        height={90}
                        className="object-cover rounded-sm overflow-hidden"
                      />
                      <p className="absolute -top-2 left-20 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-muted-foreground text-xs">
                        {item.quantity}
                      </p>
                      <div>
                        <h3 className="text-sm text-foreground">
                          {item.product.name}
                        </h3>
                        <p className="text-mute">
                          {item.size + " • " + item.color}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p>৳{item.price * item.quantity}</p>
                      <p className="text-[0.9rem] text-mute">
                        ৳{item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal (selected)
                  </span>
                  <span className="text-foreground font-medium">
                    ৳{amount.toFixed(2)}
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
                <span className="text-lg font-medium text-foreground">
                  Total
                </span>
                <span className="text-2xl font-semibold text-foreground">
                  ৳{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method and Delivery Info */}
          <div className="space-y-3">
            <h3>Payment Method : {res?.paymentMethod.toUpperCase()}</h3>

            <div className="p-5 border rounded-md shadow-sm shadow-card sm:p-4">
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:gap-7 gap-4">
                  <div className="space-y-3 w-full">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      readOnly
                      value={res?.firstName}
                      type="text"
                    />
                  </div>
                  <div className="space-y-3 w-full">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={res?.lastName!}
                      type="text"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-7 gap-4">
                  <div className="space-y-3 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" readOnly value={res?.email} type="text" />
                  </div>
                  <div className="space-y-3 w-full">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={res?.phone}
                      type="text"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-7 gap-4">
                  <div className="space-y-3 w-full">
                    <Label htmlFor="region">Region</Label>
                    <Input
                      id="region"
                      readOnly
                      value={res?.region}
                      type="text"
                    />
                  </div>
                  <div className="space-y-3 w-full">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={res?.city} type="text" readOnly />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-7 gap-4">
                  <div className="space-y-3 w-full">
                    <Label htmlFor="zone">Zone</Label>
                    <Input id="zone" readOnly value={res?.zone} type="text" />
                  </div>
                  <div className="space-y-3 w-full">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={res?.address}
                      type="text"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-7 gap-4">
                  <div className="space-y-3 w-full">
                    <Label htmlFor="addressType">Type</Label>
                    <Input
                      id="addressType"
                      readOnly
                      value={res?.addressType!}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default View;
