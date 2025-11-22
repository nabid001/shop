import Link from "next/link";
import NotLoggedIn from "@/features/cart/components/NotLoggedIn";
import { getCurrentUser } from "@/services/getCurrentUser";
import { CartClient } from "@/features/cart/components/CartClient";
import { getCartProducts } from "@/features/cart/db/cart";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Your Cart — Luxe Store",
  description: "View and manage the products in your shopping cart.",
  robots: {
    index: false,
    follow: false,
  },
};

const Cart = async () => {
  const { userId } = await getCurrentUser();

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
    return <NotLoggedIn />;
  }

  return <CartClient cartItem={res.data!} userId={userId!} />;
};

export default Cart;
