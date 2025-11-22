import CheckoutClient from "@/features/checkout/components/CheckoutClient";
import { getAddress } from "@/features/checkout/db/address";
import { getCurrentUser } from "@/services/getCurrentUser";
import { RedirectToSignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Checkout — Luxe Store",
  description: "Complete your purchase securely.",
  robots: {
    index: false,
    follow: false,
  },
};

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
