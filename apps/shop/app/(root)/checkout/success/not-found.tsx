import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen mt-28 items-center flex-col gap-3">
      <h2 className="text-4xl">Not Found</h2>
      <p className="text-lg text-mute">Could not find requested resource</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
