import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Suspense } from "react";
import { getCartLength } from "../actions/cart";

const Header = async () => {
  const { user, clerkUserId } = await getCurrentUser({ allData: true });
  const isAdmin: boolean = user?.role === "admin" && user?.role === "admin";

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={"/"} className="nav-logo">
            LUXE STORE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/product" className="nav-link">
              Products
            </Link>
            <Link href="/collections" className="nav-link">
              Collections
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>

            <Suspense fallback={<div>Loading...</div>}>
              <Link href="/cart">
                <CartItemLength userId={user?.id!} />
              </Link>
            </Suspense>

            <SignedOut>
              <Button asChild variant="outline">
                <SignInButton />
              </Button>
            </SignedOut>

            <SignedIn>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Avatar>
                      <AvatarImage
                        src={user?.picture!}
                        alt={user?.name!}
                        width={100}
                        height={100}
                      />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin/dashboard"
                        target="_blank"
                        className="nav-link"
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/profile/my-details" className="nav-link">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="">
                <SheetHeader>
                  <SheetTitle className="text-lg font-light">
                    LUXE STORE
                  </SheetTitle>
                </SheetHeader>
                <div className="border-t border-border/50 py-4 px-4">
                  <nav className="flex flex-col space-y-4">
                    <Link href="/product" className="nav-link">
                      Products
                    </Link>
                    <Link href="/collections" className="nav-link">
                      Collections
                    </Link>
                    <Link href="/about" className="nav-link">
                      About
                    </Link>
                    <Link href="/contact" className="nav-link">
                      Contact
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const CartItemLength = async ({ userId }: { userId: string }) => {
  const items = await getCartLength({ userId });

  return (
    <Button variant="ghost" size="icon" className="relative">
      <ShoppingBag className="h-4 w-4" />
      <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {items}
      </span>
    </Button>
  );
};
