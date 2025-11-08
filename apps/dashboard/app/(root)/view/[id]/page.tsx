import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import ProductInfo from "@/features/orders/components/product-info";
import UserInfo from "@/features/orders/components/user-info";
import { getOrderById } from "@/features/orders/db/order";
import console from "console";

const View = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const res = await getOrderById({ id });

  // Todo: getOrderById fetch function need more queries-: imgUrl from sanity and etc

  return (
    <SidebarInset>
      <SiteHeader siteName="View" />

      <div className="sm:max-w-5xl w-full mx-auto mt-5 py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg">Order Details</h1>
        <div className="space-y-10 mt-5">
          <div className="space-y-3">
            <h3 className="text-md">Product Info</h3>
            <ProductInfo />
          </div>
          <div className="space-y-3">
            <h3 className="text-md">User Info</h3>
            <UserInfo userId={id} />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default View;
