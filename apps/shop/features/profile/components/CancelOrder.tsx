"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cancelOrder } from "../db/order";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const OrderCancel = ({
  orderId,
  userId,
}: {
  orderId: string;
  userId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, IsLoading] = useState(false);

  // TODO: Have implement Order cancel reason
  const cancelReason = "Price is too hight";

  const handleCancel = async () => {
    IsLoading(true);

    const res = await cancelOrder({ orderId, cancelReason, userId });
    if (!res) {
      IsLoading(false);

      toast.error("Something went wrong!", {
        description: "Failed to cancel your order",
      });
    } else if (res) {
      IsLoading(false);

      setIsOpen(false);
      toast.success("Order canceled successfully!");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          size={"sm"}
          className="cursor-pointer bg-destructive/80"
        >
          Cancel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel this order?</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          This action cannot be undone. Once you cancel the order, it will be
          marked as canceled and will no longer be processed.
        </DialogDescription>

        <DialogFooter>
          <Button asChild variant={"outline"}>
            <DialogClose>No</DialogClose>
          </Button>
          <Button variant={"destructive"} onClick={() => handleCancel()}>
            {isLoading ? (
              <>
                <Spinner />
                Cancel
              </>
            ) : (
              "Cancel"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderCancel;
