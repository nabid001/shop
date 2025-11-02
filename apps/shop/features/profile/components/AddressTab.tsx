"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { use, useState } from "react";
import { deleteAddress } from "../db/address";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import AddAddress from "./AddAddress";
import { Badge } from "@/components/ui/badge";

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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = async (addressId: string) => {
    setIsDeleting(true);

    try {
      const res = await deleteAddress({ userId, addressId: addressId });
      if (res) toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Delete");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <TabsContent value="addresses" className="space-y-4 flex flex-col gap-4">
        <div className="ml-auto">
          <AddAddress userId={userId} />
        </div>

        {addresses?.length && addresses?.length! > 0 ? (
          addresses?.map((address) => (
            <Card key={address.id} className="p-6 relative max-w-xs">
              <div className="pr-24 sm:pr-0">
                <h3 className="font-medium text-foreground mb-2">
                  {address.firstName} {address?.lastName}
                </h3>
                <Badge variant={"outline"} className="capitalize mb-1">
                  {address.addressType}
                </Badge>
                <p className="text-mute">
                  {address.address}, {address.zone}, {address.city},{" "}
                  {address.region}
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent text-destructive hover:text-destructive"
                  onClick={() => handleClick(address.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-1" />
                  {isDeleting ? (
                    <>
                      <Spinner />
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <>
            <div>
              <h3>No Address Found!</h3>
            </div>
          </>
        )}
      </TabsContent>
    </>
  );
};

export default AddressTab;
