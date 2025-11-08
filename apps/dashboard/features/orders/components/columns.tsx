"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUpDown, Check, MoreHorizontal } from "lucide-react";
import ProductInfo from "./product-info";
import UserInfo from "./user-info";
import { getOrderById } from "../db/order";
import { useEffect } from "react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  email: string;
  totalAmount: number;
  paymentMethod: "cod" | "bkash" | "sslcommerz";
  orderStatus:
    | "pending"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded"
    | "paid";
  address: string;
  userId: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ table, row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(e) => row.toggleSelected(!!e)}
          aria-label="Select Row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Order Id",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant={"ghost"}
        >
          Amount
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const format = new Intl.NumberFormat("en-US", {
        currency: "bdt",
        style: "currency",
      }).format(amount);

      return <div>{format}</div>;
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
  },
  {
    accessorKey: "paymentMethod",
    // header: ({ column }) => {
    //   const [selectedVal, setSelectedVal] = useState("");

    //   const handleChange = (value: string) => {
    //     setSelectedVal(value);
    //     column.setFilterValue(value === "" ? undefined : value);
    //   };

    //   return (
    //     <div className="flex flex-col space-y-2">
    //       <Select onValueChange={handleChange} value={selectedVal}>
    //         <SelectTrigger className="w-[180px]">
    //           <SelectValue placeholder="Payment Method" />
    //         </SelectTrigger>
    //         <SelectContent className="bg-card p-3 rounded-sm">
    //           <SelectGroup>
    //             <SelectItem value="cod">Cash on Delivery</SelectItem>
    //             <SelectItem value="bkash">bKash</SelectItem>
    //             <SelectItem value="sslcommerz">SSLCommerz</SelectItem>
    //             {selectedVal && (
    //               <span
    //                 onClick={() => handleChange("")}
    //                 className="hover:text-destructive p-2 cursor-pointer"
    //               >
    //                 Clear filter
    //               </span>
    //             )}
    //           </SelectGroup>
    //         </SelectContent>
    //       </Select>
    //     </div>
    //   );
    // },
    header: "Payment Method",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row, table }) => {
      const val = row.original;
      // const res = await getOrderById({
      //   id: row.id,
      // });
      // let data = {};

      // useEffect(() => {
      //   const main = async () => {
      //     const res = await getOrderById({ id: val.id, userId: val.userId });
      //     data = res;
      //   };

      //   main();
      // }, [val.id]);

      // console.log({ id: val.id });

      // return (
      //   <DropdownMenu>
      //     <DropdownMenuTrigger asChild>
      //       <Button variant="ghost" className="h-8 w-8 p-0">
      //         <span className="sr-only">Open menu</span>
      //         <MoreHorizontal />
      //       </Button>
      //     </DropdownMenuTrigger>

      //     <DropdownMenuContent align="end">
      //       <DropdownMenuLabel>Actions</DropdownMenuLabel>
      //       <DropdownMenuSeparator />

      //       {/* <DropdownMenuItem
      //         onSelect={(e) => {
      //           e.preventDefault();
      //         }}
      //         asChild
      //       >
      //         <Dialog>
      //           <DialogTrigger>View</DialogTrigger>
      //           <DialogContent className="sm:max-w-5xl">
      //             <DialogHeader>
      //               <DialogTitle>Order Details</DialogTitle>
      //             </DialogHeader>

      //             <div className="space-y-10 mt-5">
      //               <div className="space-y-3">
      //                 <h3 className="text-md">Product Info</h3>
      //                 <ProductInfo />
      //               </div>

      //               <div className="space-y-3">
      //                 <h3 className="text-md">User Info</h3>
      //                 <UserInfo userId={val.id} />
      //               </div>
      //             </div>
      //           </DialogContent>
      //         </Dialog>
      //         <Link href={`/view/${val.id}`}>View</Link>
      //       </DropdownMenuItem> */}
      //       <Link href={`/view/${val.id}`} prefetch={false}>
      //         View
      //       </Link>
      //       {/* <DropdownMenuItem asChild>
      //       </DropdownMenuItem> */}

      //       <DropdownMenuItem
      //         onClick={() => console.log("Delete clicked")}
      //         className="text-destructive focus:text-destructive"
      //       >
      //         Delete
      //       </DropdownMenuItem>
      //     </DropdownMenuContent>
      //   </DropdownMenu>
      // );
      return (
        <Button size={"sm"} variant={"outline"} asChild>
          <Link href={`/view/${val.id}`} prefetch={false}>
            View
          </Link>
        </Button>
      );
    },
  },
];
