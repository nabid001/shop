import { SectionCards } from "@/components/sidebar/section-cards";
import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import React from "react";

const Customers = () => {
  return (
    <SidebarInset>
      <SiteHeader siteName="Customers" />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 p-4 px md:gap-6 md:p-6">
            <h1>customers</h1>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default Customers;
