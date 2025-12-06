"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  Edit2,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Home,
  Building2,
  MoreVertical,
} from "lucide-react";
import { use, useState } from "react";
import { deleteAddress } from "../db/address";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import AddAddress from "./AddAddress";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  addressPromise: Promise<
    | {
        id: string;
        userId: string;
        firstName: string;
        lastName: string | null;
        phone: string;
        region: string;
        city: string;
        zone: string;
        address: string;
        landmark: string | null;
        email: string;
        addressType: "home" | "office" | null;
        createdAt: Date | null;
        updatedAt: Date | null;
      }[]
    | undefined
  >;
  userId: string;
};

const AddressTab = ({ addressPromise, userId }: Props) => {
  const addresses = use(addressPromise);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (addressId: string) => {
    setIsDeleting(addressId);

    try {
      const res = await deleteAddress({ userId, addressId: addressId });
      if (res) toast.success("Address deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete address");
    } finally {
      setIsDeleting(null);
    }
  };

  const getAddressTypeIcon = (type: "home" | "office" | null) => {
    switch (type) {
      case "home":
        return Home;
      case "office":
        return Building2;
      default:
        return MapPin;
    }
  };

  const getAddressTypeColor = (type: "home" | "office" | null) => {
    switch (type) {
      case "home":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "office":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <TabsContent value="addresses" className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-foreground">
            Saved Addresses
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your delivery addresses
          </p>
        </div>
        <AddAddress userId={userId} />
      </div>

      {/* Addresses Grid */}
      {addresses?.length && addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addresses.map((address) => {
            const AddressIcon = getAddressTypeIcon(address.addressType);
            const typeColorClass = getAddressTypeColor(address.addressType);
            const isDeletingThis = isDeleting === address.id;

            return (
              <Card
                key={address.id}
                className="group relative overflow-hidden border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all duration-200 p-0"
              >
                <CardContent className="p-6 py-6">
                  {/* Header with Icon and Actions */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-lg ${typeColorClass} border`}
                      >
                        <AddressIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">
                          {address.firstName} {address?.lastName}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`capitalize mt-1 ${typeColorClass} border`}
                        >
                          {address.addressType || "Other"}
                        </Badge>
                      </div>
                    </div>

                    {/* Dropdown Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 opacity-80 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(address.id)}
                          disabled={isDeletingThis}
                        >
                          {isDeletingThis ? (
                            <>
                              <Spinner className="mr-2 h-4 w-4" />
                              Deleting...
                            </>
                          ) : (
                            <>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Address Details */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-400" />
                      <div className="flex-1">
                        <p className="leading-relaxed">
                          {address.address}
                          {address.landmark && (
                            <span className="block text-xs mt-0.5">
                              {address.landmark}
                            </span>
                          )}
                        </p>
                        <p className="mt-1">
                          {address.zone}, {address.city}, {address.region}
                        </p>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="pt-3 border-t border-zinc-100 space-y-2">
                      {address.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4 text-zinc-400" />
                          <span>+88{address.phone}</span>
                        </div>
                      )}
                      {address.email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4 text-zinc-400" />
                          <span className="truncate">{address.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons - Mobile */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-zinc-100 md:hidden">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(address.id)}
                      disabled={isDeletingThis}
                    >
                      {isDeletingThis ? (
                        <Spinner className="h-4 w-4" />
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <Card className="border-dashed border-2 border-zinc-200">
          <CardContent className="flex flex-col items-center justify-center py-12 px-6">
            <div className="rounded-full bg-zinc-100 p-4 mb-4">
              <MapPin className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No addresses saved
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
              Add your first delivery address to get started. You can add
              multiple addresses for home, office, or other locations.
            </p>
            <AddAddress userId={userId} />
          </CardContent>
        </Card>
      )}
    </TabsContent>
  );
};

export default AddressTab;
