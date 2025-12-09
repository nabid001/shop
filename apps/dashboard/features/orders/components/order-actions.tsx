"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/features/orders/db/order";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

type Props = {
  orderId: string;
  orderStatus: OrderStatus;
};

const statusColor: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const CONFIRMABLE_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

export function OrderActions({ orderId, orderStatus }: Props) {
  const [isPending, startTransition] = useTransition();
  const isCancelled = orderStatus === "cancelled";
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    orderStatus ?? "pending"
  );

  const handleStatusChange = (status: OrderStatus) => {
    setSelectedStatus(status);
    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, status);
      } catch (error) {
        console.error("Failed to update order status", error);
      }
    });
  };

  const handleCancel = () => {
    if (isCancelled) return;
    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, "cancelled");
      } catch (error) {
        console.error("Failed to cancel order", error);
      }
    });
  };

  return (
    <div className="flex items-center gap-3 flex-wrap justify-end">
      <Badge
        variant="outline"
        className={`capitalize border ${statusColor[orderStatus]}`}
      >
        {orderStatus}
      </Badge>

      <Select
        value={selectedStatus}
        onValueChange={(v) => handleStatusChange(v as OrderStatus)}
        disabled={isPending}
      >
        <SelectTrigger className="w-[170px] capitalize">
          <SelectValue placeholder="Update status" />
        </SelectTrigger>
        <SelectContent>
          {CONFIRMABLE_STATUSES.map((status) => (
            <SelectItem
              key={status}
              value={status}
              className="capitalize"
              disabled={isPending && status !== orderStatus}
            >
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="default"
        size="sm"
        onClick={() => handleStatusChange("processing")}
        disabled={isPending || isCancelled}
      >
        {isPending && selectedStatus === "processing"
          ? "Confirming..."
          : "Confirm order"}
      </Button>

      <Button
        variant="destructive"
        size="sm"
        onClick={handleCancel}
        disabled={isPending || isCancelled}
      >
        {isCancelled
          ? "Cancelled"
          : isPending
            ? "Cancelling..."
            : "Cancel order"}
      </Button>
    </div>
  );
}
