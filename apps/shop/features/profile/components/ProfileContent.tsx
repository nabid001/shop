import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin, ShoppingBag, Edit2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

// Mock orders
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

// Mock addresses
const mockAddresses = [
  {
    id: 1,
    type: "Home",
    name: "Sarah Anderson",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    name: "Sarah Anderson",
    address: "456 Business Ave",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    country: "USA",
    isDefault: false,
  },
];

export function ProfileContent() {
  return (
    <>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4 hidden sm:block" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Profile</span>
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
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-foreground">
                  Personal Information
                </h2>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Edit2 className="h-4 w-4 mr-2" />
                </Button>
              </div>
            </Card>

            {/* Account Settings */}
            <Card className="p-6 sm:p-8">
              <h2 className="text-2xl font-light text-foreground mb-6">
                Account Settings
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">
                      Change Password
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Update your password regularly
                    </p>
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    Change
                  </Button>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">
                      Email Notifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Manage your notification preferences
                    </p>
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    Enable
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {mockOrders.length === 0 ? (
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
              mockOrders.map((order) => (
                <Card
                  key={order.id}
                  className="p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-medium text-foreground">
                          {order.id}
                        </h3>
                        <span
                          className={`text-sm font-medium ${order.statusColor}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.date} • {order.items} items
                      </p>
                    </div>
                    <div className="flex flex-col sm:text-right gap-2">
                      <p className="font-semibold text-foreground">
                        {order.total}
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
          <TabsContent value="addresses" className="space-y-4">
            <Button className="w-full sm:w-auto mb-4">
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </Button>

            {mockAddresses.map((address) => (
              <Card key={address.id} className="p-6 relative">
                {address.isDefault && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Default
                  </div>
                )}
                <div className="pr-24 sm:pr-0">
                  <h3 className="font-medium text-foreground mb-2">
                    {address.type}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {address.name}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    {address.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.state} {address.zipCode},{" "}
                    {address.country}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
