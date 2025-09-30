import { getCartItems } from "@/drizzle/actions/cart";
import { getCurrentUser } from "@/lib/getCurrentUser";
import NotLoggedIn from "@/features/cart/components/NotLoggedIn";
import CartContent from "@/features/cart/components/CartContent";

const Cart = async () => {
  const user = await getCurrentUser();
  if (!user.clerkUserId) <NotLoggedIn />;

  // const cartProducts = await getCartItems(user?.userId!);
  // console.log(cartProducts);

  return (
    <section className="component-padding">
      <div className="component-container">
        <h1 className="text-4xl text-foreground">Shopping Cart</h1>
        <CartContent />
      </div>
    </section>
  );
};

export default Cart;
