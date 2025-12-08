import AddressTab from "@/features/profile/components/AddressTab";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  MapPin,
  ShoppingBag,
  Package,
  CheckCircle,
  Truck,
  Clock,
  Phone,
  CreditCard,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { Suspense } from "react";
import { getAddress } from "@/features/profile/db/address";
import { getOrders } from "@/features/profile/db/order";
import { SignOutButton, UserProfile } from "@clerk/nextjs";
import { getCurrentUser } from "@/services/getCurrentUser";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrderCancel from "@/features/profile/components/CancelOrder";

export const metadata = {
  title: "My Account — Foxivo Store",
  description: "Manage your account details, orders, and preferences.",
  robots: {
    index: false,
    follow: false,
  },
};

type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

const getOrderStatusConfig = (status: OrderStatus) => {
  const configs = {
    pending: {
      icon: Clock,
      label: "Pending",
      className:
        "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
      iconClassName: "text-yellow-600",
    },
    paid: {
      icon: Package,
      label: "Processing",
      className: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
      iconClassName: "text-blue-600",
    },
    shipped: {
      icon: Truck,
      label: "Shipped",
      className:
        "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
      iconClassName: "text-purple-600",
    },
    delivered: {
      icon: CheckCircle,
      label: "Delivered",
      className:
        "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
      iconClassName: "text-green-600",
    },
    cancelled: {
      icon: XCircle,
      label: "Cancelled",
      className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
      iconClassName: "text-red-600",
    },
    refunded: {
      icon: RotateCcw,
      label: "Refunded",
      className: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
      iconClassName: "text-gray-600",
    },
  };

  return configs[status] || configs.pending;
};

const Profile = async () => {
  const { user, userId } = await getCurrentUser({ allData: true });
  const addressPromise = getAddress(userId!);
  const orders = await getOrders(userId!);

  const steps = [
    { key: "pending", label: "Placed", icon: Clock },
    { key: "paid", label: "Processing", icon: Package },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  return (
    <main>
      {/* Header */}
      {/* <div className="bg-gradient-to-r from-foreground/5 to-foreground/10 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-border">
              <AvatarImage src={user?.picture!} alt={user?.name!} />
              <AvatarFallback>{user?.name!}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-light text-foreground mb-2 text-balance">
                {user?.name}
              </h1>
              <p className="text-muted-foreground mb-4">{user?.email}</p>
            </div>
            <Button asChild variant={"outline"}>
              <SignOutButton />
            </Button>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-fit gap-10 grid-cols-4 mb-8 bg-muted/50">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4 hidden sm:block" />
              <span className="">Account</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 hidden sm:block" />
              <span className="hidden sm:inline">Orders</span>
              <span className="sm:hidden">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 hidden sm:block" />
              <span className="hidden sm:inline">Addresses</span>
              <span className="sm:hidden">Address</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="account" className="space-y-6">
            <Suspense fallback="Loading...">
              <UserProfile routing="hash" />
            </Suspense>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent
            value="orders"
            className="w-full mx-auto space-y-4 max-w-4xl"
          >
            {!orders?.length ? (
              <div className="p-12 text-center">
                {/* <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" /> */}
                <h3 className="text-xl font-light text-foreground mb-1">
                  No orders yet!
                </h3>
                <p className="text-mute mb-6">
                  Start shopping to see your orders here
                </p>
                <Button asChild variant={"outline"}>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              orders?.map((order) => (
                <div
                  key={order.id}
                  className="p-4 hover:shadow-sm transition-shadow border rounded-md bg-card/40"
                >
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-wrap items-start gap-3">
                        <div className="bg-zinc-100 p-2.5 rounded-xl">
                          <Package className="w-5 h-5 text-zinc-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground/90 tracking-tight">
                            Order #{order.id.trimEnd().slice(-6).toUpperCase()}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Placed on{" "}
                            {order?.createdAt?.toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        {(() => {
                          const statusConfig = getOrderStatusConfig(
                            order.orderStatus as OrderStatus
                          );
                          const StatusIcon = statusConfig.icon;
                          return (
                            <Badge
                              className={`ml-auto lg:ml-2 px-3 py-1 capitalize border ${statusConfig.className}`}
                            >
                              <StatusIcon
                                className={`w-3.5 h-3.5 mr-1.5 ${statusConfig.iconClassName}`}
                              />
                              {statusConfig.label}
                            </Badge>
                          );
                        })()}
                      </div>
                      <div>
                        <h3 className="text-mute">
                          Total:{" "}
                          <span className="font-semibold text-foreground text-lg">
                            ৳{order.totalAmount}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-3 mt-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {order.items.map((val, i) => {
                          return (
                            <div
                              key={i}
                              // className="border-2 border-foreground/10 rounded-md"
                              className="relative w-12 h-12 rounded-lg border-2 border-white bg-zinc-100 overflow-hidden shadow-sm z-10 hover:z-20 hover:scale-110 hover:shadow-md transition-all duration-200"
                            >
                              <Image
                                src={val.product.image}
                                alt={val.productId}
                                width={130}
                                height={130}
                                className="rounded-md overflow-hidden object-contain "
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Dialog Start ->*/}
                      <div className="space-x-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant={"secondary"}
                              size={"sm"}
                              className="cursor-pointer"
                            >
                              Details
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="sm:min-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* Order Id, Date, and Action Buttons */}
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-muted-foreground">
                                    Order ID:{" "}
                                  </span>
                                  <span className="font-mono font-medium text-foreground">
                                    {order.id.trimEnd().slice(-6).toUpperCase()}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="bg-zinc-50"
                                  >
                                    {order.createdAt?.toLocaleDateString()}
                                  </Badge>
                                </div>
                              </div>

                              {/* Progress Tracker */}
                              <div className="flex items-center justify-between relative">
                                {steps.map((step, index) => {
                                  const stepStatus = order.orderStatus;
                                  const isCompleted =
                                    stepStatus === "delivered" ||
                                    (stepStatus === "shipped" && index <= 2) ||
                                    (stepStatus === "pending" && index === 0);
                                  const isActive =
                                    (stepStatus === "pending" && index === 0) ||
                                    (stepStatus === "shipped" && index === 2) ||
                                    (stepStatus === "delivered" && index === 3);
                                  const Icon = step.icon;

                                  return (
                                    <div
                                      key={step.key}
                                      className="flex flex-col items-center flex-1 relative"
                                    >
                                      {index < steps.length - 1 && (
                                        <div
                                          className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 ${
                                            isCompleted
                                              ? "bg-green-600"
                                              : "bg-zinc-200"
                                          }`}
                                        />
                                      )}
                                      <div
                                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 z-10 mb-2 ${
                                          isCompleted
                                            ? "bg-green-600 border-green-600 text-white"
                                            : isActive
                                              ? "bg-blue-600 border-blue-600 text-white"
                                              : "bg-zinc-100 border-zinc-200 text-zinc-400"
                                        }`}
                                      >
                                        <Icon className="w-4 h-4" />
                                      </div>
                                      <div className="text-center">
                                        <p
                                          className={`text-xs font-medium ${
                                            isCompleted || isActive
                                              ? "text-foreground"
                                              : "text-zinc-400"
                                          }`}
                                        >
                                          {step.label}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Main Content */}
                              <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                                {/* Left Column - Items */}
                                <div className="md:col-span-2 space-y-4">
                                  <div className="bg-card/5 border border-zinc-200 p-5 rounded-lg space-y-4">
                                    <h3 className="text-md font-semibold text-foreground">
                                      {order.items.length > 1
                                        ? "Items"
                                        : "Item"}{" "}
                                      ({order.items.length})
                                    </h3>

                                    <div className="space-y-4">
                                      {order.items.map((item, i) => {
                                        if (!item.product) return null;
                                        const imageUrl = Array.isArray(
                                          item.product.image
                                        )
                                          ? item.product.image[0]
                                          : item.product.image;
                                        const orderItem = item as unknown as {
                                          productId: string;
                                          quantity: number;
                                          price: number;
                                          color: string;
                                          size: string;
                                          product: {
                                            _id: string;
                                            name: string;
                                            image: string | string[];
                                            price: number;
                                          } | null;
                                        };
                                        const itemTotal =
                                          (orderItem.price || 0) *
                                          (orderItem.quantity || 1);

                                        return (
                                          <div
                                            key={i}
                                            className="flex items-start gap-4 pb-4 border-b border-zinc-200 last:border-0 last:pb-0"
                                          >
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50 flex-shrink-0">
                                              <Image
                                                src={imageUrl}
                                                alt={
                                                  orderItem.product?.name ||
                                                  "Product"
                                                }
                                                fill
                                                className="object-cover"
                                              />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <h4 className="font-medium text-foreground mb-1">
                                                {orderItem.product?.name ||
                                                  "Product"}
                                              </h4>
                                              <div className="space-y-1 text-sm text-muted-foreground">
                                                <p>
                                                  Variant:{" "}
                                                  {orderItem.color || "N/A"} -{" "}
                                                  {orderItem.size || "N/A"}
                                                </p>
                                                <p>
                                                  Qty: {orderItem.quantity || 1}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                              <p className="font-semibold text-foreground">
                                                ৳
                                                {itemTotal.toLocaleString(
                                                  "en-US",
                                                  {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                  }
                                                )}
                                              </p>
                                              <p className="text-mute text-xs">
                                                ৳{orderItem.price} each
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* Cost Summary */}
                                    <div className="pt-4 border-t border-zinc-200 space-y-2">
                                      {(() => {
                                        const subtotal = order.items.reduce(
                                          (sum, item) => {
                                            const orderItem =
                                              item as unknown as {
                                                price: number;
                                                quantity: number;
                                              };
                                            return (
                                              sum +
                                              (orderItem.price || 0) *
                                                (orderItem.quantity || 1)
                                            );
                                          },
                                          0
                                        );
                                        const shipping = 150; // Fixed shipping cost
                                        const total = subtotal + shipping;

                                        return (
                                          <>
                                            <div className="flex justify-between text-sm">
                                              <span className="text-muted-foreground">
                                                Subtotal
                                              </span>
                                              <span className="text-foreground">
                                                ৳
                                                {subtotal.toLocaleString(
                                                  "en-US",
                                                  {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                  }
                                                )}
                                              </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                              <span className="text-muted-foreground">
                                                Shipping
                                              </span>
                                              <span className="text-foreground">
                                                ৳
                                                {shipping.toLocaleString(
                                                  "en-US",
                                                  {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                  }
                                                )}
                                              </span>
                                            </div>

                                            <div className="flex justify-between text-base font-semibold pt-2 border-t border-zinc-200">
                                              <span className="text-foreground">
                                                Total
                                              </span>
                                              <span className="text-foreground">
                                                ৳
                                                {total.toLocaleString("en-US", {
                                                  minimumFractionDigits: 0,
                                                  maximumFractionDigits: 0,
                                                })}
                                              </span>
                                            </div>
                                          </>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  {/* Shipping */}
                                  <Card className="border-0 shadow-none bg-card/5 ring-1 ring-zinc-200">
                                    <CardHeader className="">
                                      <CardTitle className="">
                                        Shipping
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-zinc-400 mt-0.5" />
                                        <div className="text-sm">
                                          <p className="font-medium text-foreground">
                                            {order.firstName} {order?.lastName}
                                          </p>
                                          <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                                            {order.address},{order.zone},
                                            <br />
                                            {order.city}, {order.region}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-zinc-400" />
                                        <p className="text-xs text-muted-foreground">
                                          +88{order.phone}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Payment */}
                                  <Card className="border-0 bg-card/5 shadow-none ring-1 ring-zinc-200">
                                    <CardHeader className="">
                                      <CardTitle className="">
                                        Payment
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="flex items-center gap-3">
                                        <CreditCard className="w-4 h-4 text-zinc-400" />
                                        <div>
                                          <p className="text-sm font-medium uppercase">
                                            {order.paymentMethod}
                                          </p>
                                          <p className="text-xs text-green-600 font-medium">
                                            Payment verified
                                          </p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Support Link */}
                                  <div className="text-sm text-center pt-2">
                                    <span className="text-muted-foreground">
                                      Need help?{" "}
                                    </span>
                                    <Link
                                      href="/contact"
                                      className="text-blue-600 hover:text-blue-700 underline font-medium"
                                    >
                                      Contact Support
                                    </Link>
                                  </div>
                                </div>
                              </div>

                              {/* Main Products End */}
                            </div>
                          </DialogContent>
                        </Dialog>
                        {order.orderStatus === "pending" && (
                          <OrderCancel orderId={order.id} userId={userId!} />
                        )}
                      </div>
                    </div>
                    <Badge variant={"secondary"} className="">
                      {order.items.length}{" "}
                      {order.items.length > 1 ? "Items" : "Item"}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          {/* Addresses Tab */}
          <Suspense fallback="Address...">
            <AddressTab addressPromise={addressPromise} userId={userId!} />
          </Suspense>
        </Tabs>
      </div>
    </main>
  );
};

export default Profile;

interface TimelineItemProps {
  active: boolean;
  completed: boolean;
  label: string;
  date?: string;
  icon: any;
  last?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  active,
  completed,
  label,
  date,
  icon: Icon,
  last = false,
}) => {
  let colorClass = "text-zinc-400 border-zinc-200 bg-zinc-50";
  if (completed) colorClass = "text-green-600 border-green-600 bg-green-50";
  else if (active) colorClass = "text-blue-600 border-blue-600 bg-blue-50";

  return (
    <div
      className={`flex flex-col items-center flex-1 relative ${!last ? "md:border-t-2 md:border-zinc-100 md:pb-0 pb-8" : ""}`}
    >
      {!last && (
        <div
          className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 hidden md:block ${completed ? "bg-green-600" : "bg-zinc-100"}`}
        />
      )}
      {!last && (
        <div
          className={`absolute left-4 top-8 bottom-0 w-0.5 md:hidden -z-10 ${completed ? "bg-green-600" : "bg-zinc-100"}`}
        />
      )}

      <div
        className={`flex items-center justify-center w-9 h-9 rounded-full border-2 z-10 mb-2 ${colorClass}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-center">
        <p
          className={`text-sm font-semibold ${active || completed ? "text-foreground" : "text-zinc-400"}`}
        >
          {label}
        </p>
        {date && <p className="text-xs text-muted-foreground">{date}</p>}
      </div>
    </div>
  );
};
