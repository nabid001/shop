import { getCurrentUser } from "@/lib/getCurrentUser";
import NotLoggedIn from "@/features/cart/components/NotLoggedIn";
import { CartClient } from "@/features/cart/components/CartClient";

const Cart = async () => {
  const user = await getCurrentUser();
  if (!user.clerkUserId) <NotLoggedIn />;

  return <CartClient />;
};

export default Cart;
