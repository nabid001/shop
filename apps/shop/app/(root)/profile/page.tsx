import { ProfileContent } from "@/features/profile/components/ProfileContent";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { ClerkDegraded, SignOutButton, UserProfile } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin, ShoppingBag, Edit2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getAddress } from "@/features/profile/db/address";
import AddressTab from "@/features/profile/components/AddressTab";
import { getOrders } from "@/features/profile/db/order";

const mockOrders = [
  {
    id: "ORD-001",
    date: "Dec 15, 2024",
    items: 3,
    total: "$245.99",
    status: "Delivered",
    statusColor: "text-green-600",
  },
  {
    id: "ORD-002",
    date: "Dec 8, 2024",
    items: 2,
    total: "$189.50",
    status: "Delivered",
    statusColor: "text-green-600",
  },
  {
    id: "ORD-003",
    date: "Nov 30, 2024",
    items: 1,
    total: "$89.99",
    status: "In Transit",
    statusColor: "text-blue-600",
  },
];

const Profile = async () => {
  const { user, userId } = await getCurrentUser({ allData: true });
  const addressPromise = getAddress(userId!);
  const orders = await getOrders(userId!);

  return (
    <main className="">
      {/* Header */}
      <div className="bg-gradient-to-r from-foreground/5 to-foreground/10 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-border">
              <AvatarImage src={user?.picture!} alt={user?.name} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
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
      </div>

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
          <TabsContent value="orders" className="space-y-4">
            {!orders?.length ? (
              <Card className="p-12 text-center">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-light text-foreground mb-2">
                  No orders yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start shopping to see your orders here
                </p>
                <Link href="/products">
                  <Button>Continue Shopping</Button>
                </Link>
              </Card>
            ) : (
              orders?.map((order) => (
                <Card
                  key={order.id}
                  className="p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-medium text-foreground">
                          Order Id: {order.id}
                        </h3>
                        <span className={`text-sm font-medium text-indigo-300`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Date: {order.createdAt?.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:text-right gap-2">
                      <p className="font-semibold text-foreground">
                        ৳{order.totalAmount}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
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
