import { urlFor } from "@repo/sanity-config/image";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Toaster = (message: string) => {
  return toast(message);
};

export const imageUrl = (val: string) => urlFor(val).url();
export const blurUrl = (val: string) => urlFor(val).blur(1000).url();
