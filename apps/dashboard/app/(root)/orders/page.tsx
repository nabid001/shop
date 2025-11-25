import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { columns } from "@/features/orders/components/columns";
import { DataTable } from "@/features/orders/components/data-table";
import { getOrders } from "@/features/orders/db/order";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Orders - Foxivo",
};

const Orders = () => {
  return (
    <SidebarInset>
      <SiteHeader siteName="Orders" />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
            <h1 className="text-2xl font-bold text-shadow-accent-foreground">
              All Orders
            </h1>

            <Suspense fallback="Orders...">
              <OrderTable />
            </Suspense>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default Orders;

const OrderTable = async () => {
  const orders = await getOrders();
  if (!orders?.length) {
    return <h3>No Orders Found!</h3>;
  }

  return (
    <div className="mt-5">
      <DataTable columns={columns} data={orders} />
    </div>
  );
};
