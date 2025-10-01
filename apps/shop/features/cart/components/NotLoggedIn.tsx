import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const NotLoggedIn = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-md mx-auto">
        <Image
          src={"/svgs/sign-in-logo.svg"}
          alt="Sign In Logo"
          width={150}
          height={150}
          className="mb-4 drop-shadow-md"
        />
        <h2 className="text-3xl md:text-4xl text-foreground font-light mb-4">
          Please login to see your cart
        </h2>
        <Button variant={"outline"} className="font-medium" asChild>
          <SignInButton />
        </Button>
      </div>
    </div>
  );
};

export default NotLoggedIn;
