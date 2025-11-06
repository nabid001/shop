"use client";

import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUrlStore } from "@/lib/setPathname";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignInButton } from "@clerk/nextjs";

const NotLoggedIn = () => {
  const pathName = usePathname();
  const { addCurrentUrlPath, clearCurrentUrlPath } = useUrlStore();

  // storing the current url pathname inside localStorage
  useEffect(() => {
    const handleClick = () => {
      // Remove previous url if exist;
      clearCurrentUrlPath();
      // Add the current pathname
      addCurrentUrlPath(pathName);
    };

    handleClick();
  }, []);

  return (
    <div className="product-container">
      <div className="space-y-5 text-center">
        <LogIn className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-light text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-6">
          Please log in to view your cart
        </p>
        <Button variant="outline" asChild>
          <SignInButton />
        </Button>
      </div>
    </div>
  );
};

export default NotLoggedIn;
