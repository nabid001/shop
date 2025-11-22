import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";

export function NavUser() {
  const { user } = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserButton />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.fullName}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user?.emailAddresses[0].emailAddress}
            </span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
