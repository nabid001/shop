import CheckoutClient from "@/features/checkout/components/CheckoutClient";
import { getAddress } from "@/features/checkout/db/address";
import { getCurrentUser } from "@/services/getCurrentUser";
import { RedirectToSignIn } from "@clerk/nextjs";

const Checkout = async () => {
  const { userId, clerkUserId } = await getCurrentUser();
  if (!clerkUserId && !userId) {
    <RedirectToSignIn />;
  }

  const addressPromise = getAddress(userId!);

  return (
    <main>
      <CheckoutClient userId={userId!} addressPromise={addressPromise} />
    </main>
  );
};

export default Checkout;
