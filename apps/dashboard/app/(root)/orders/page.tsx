import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { columns, Payment } from "@/features/orders/components/columns";
import { DataTable } from "@/features/orders/components/data-table";
import { getOrderById, getOrders } from "@/features/orders/db/order";
import { Suspense } from "react";

// const data: Payment[] = [
//   {
//     id: "4c6a2b42-f35e-40fe-b5bb-836a92c77761",
//     email: "nabid.explore@gmail.com",
//     totalAmount: 749,
//     paymentMethod: "cod",
//     orderStatus: "pending",
//     address: "Nazirpur",
//   },
//   {
//     id: "7d8e3c53-a46f-51af-c6cc-947b03d88872",
//     email: "john.smith@example.com",
//     totalAmount: 1299,
//     paymentMethod: "card",
//     orderStatus: "processing",
//     address: "123 Main St, Dhaka",
//   },
//   {
//     id: "9f1a4d64-b57g-62bg-d7dd-158c14e99983",
//     email: "sarah.johnson@example.com",
//     totalAmount: 2450,
//     paymentMethod: "bkash",
//     orderStatus: "shipped",
//     address: "456 Park Avenue, Chittagong",
//   },
//   {
//     id: "2e5b6f75-c68h-73ch-e8ee-269d25f00a94",
//     email: "mike.wilson@example.com",
//     totalAmount: 599,
//     paymentMethod: "nagad",
//     orderStatus: "delivered",
//     address: "789 Lake Road, Sylhet",
//   },
//   {
//     id: "8g9c7h86-d79i-84di-f9ff-370e36g11ba5",
//     email: "emily.davis@example.com",
//     totalAmount: 3200,
//     paymentMethod: "card",
//     orderStatus: "pending",
//     address: "321 River View, Rajshahi",
//   },
//   {
//     id: "1h0d8i97-e80j-95ej-g0gg-481f47h22cb6",
//     email: "david.martinez@example.com",
//     totalAmount: 875,
//     paymentMethod: "cod",
//     orderStatus: "cancelled",
//     address: "654 Hill Street, Khulna",
//   },
//   {
//     id: "5i1e9j08-f91k-06fk-h1hh-592g58i33dc7",
//     email: "lisa.anderson@example.com",
//     totalAmount: 1650,
//     paymentMethod: "rocket",
//     orderStatus: "processing",
//     address: "987 Green Lane, Barisal",
//   },
//   {
//     id: "3j2f0k19-g02l-17gl-i2ii-603h69j44ed8",
//     email: "robert.taylor@example.com",
//     totalAmount: 4100,
//     paymentMethod: "card",
//     orderStatus: "shipped",
//     address: "147 Ocean Drive, Cox's Bazar",
//   },
//   {
//     id: "6k3g1l20-h13m-28hm-j3jj-714i70k55fe9",
//     email: "amanda.thomas@example.com",
//     totalAmount: 925,
//     paymentMethod: "bkash",
//     orderStatus: "delivered",
//     address: "258 Mountain View, Rangpur",
//   },
//   {
//     id: "0l4h2m31-i24n-39in-k4kk-825j81l66gf0",
//     email: "chris.garcia@example.com",
//     totalAmount: 1580,
//     paymentMethod: "cod",
//     orderStatus: "pending",
//     address: "369 Valley Road, Mymensingh",
//   },
//   {
//     id: "4m5i3n42-j35o-40jo-l5ll-936k92m77hg1",
//     email: "jessica.rodriguez@example.com",
//     totalAmount: 2890,
//     paymentMethod: "nagad",
//     orderStatus: "processing",
//     address: "741 Garden Street, Jessore",
//   },
//   {
//     id: "8n6j4o53-k46p-51kp-m6mm-047l03n88ih2",
//     email: "daniel.martinez@example.com",
//     totalAmount: 680,
//     paymentMethod: "card",
//     orderStatus: "shipped",
//     address: "852 Beach Road, Comilla",
//   },
//   {
//     id: "2o7k5p64-l57q-62lq-n7nn-158m14o99ji3",
//     email: "sophia.hernandez@example.com",
//     totalAmount: 3450,
//     paymentMethod: "rocket",
//     orderStatus: "delivered",
//     address: "963 Forest Avenue, Narayanganj",
//   },
//   {
//     id: "6p8l6q75-m68r-73mr-o8oo-269n25p00kj4",
//     email: "matthew.lopez@example.com",
//     totalAmount: 1120,
//     paymentMethod: "bkash",
//     orderStatus: "cancelled",
//     address: "159 Castle Lane, Bogra",
//   },
//   {
//     id: "0q9m7r86-n79s-84ns-p9pp-370o36q11lk5",
//     email: "olivia.gonzalez@example.com",
//     totalAmount: 2275,
//     paymentMethod: "cod",
//     orderStatus: "pending",
//     address: "753 Bridge Street, Dinajpur",
//   },
// ];

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
