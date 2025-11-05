import Link from "next/link";
import NotLoggedIn from "@/features/cart/components/NotLoggedIn";
import { CartClient } from "@/features/cart/components/CartClient";
import { getCartProducts } from "@/features/cart/db/cart";
import { ArrowRight, LogIn, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { getCurrentUser } from "@/services/clerk";

const Cart = async () => {
  const { clerkUserId, userId } = await getCurrentUser();
  if (!clerkUserId) <NotLoggedIn />;

  const res = await getCartProducts(userId!);

  if (!res.success && res.error == "EMPTY_CART") {
    return (
      <div className="product-container">
        <div className="space-y-5 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-light text-foreground mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Add some items to get started
          </p>
          <Link href="/products">
            <Button>
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  } else if (!res.success && res.error == "USERID_REQUIRE") {
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
  }

  return <CartClient cartItem={res.data!} userId={userId!} />;
};

export default Cart;
