"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useCheckoutStore } from "@/features/checkout/store";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/features/checkout/db/order";
import { use, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AddressType, Response } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { VeriFiedGetAddressError } from "../db/address";
import { PaymentMethod } from "@repo/drizzle-config/schemas/order";
import { CheckoutFormSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useCheckoutSuccessStore } from "@/features/checkout-success/store";
import { Spinner } from "@/components/ui/spinner";
import z from "zod";
import Image from "next/image";
import { Card } from "@/components/ui/card";

type Props = {
  userId: string;
  addressPromise: Promise<Response<VeriFiedGetAddressError, AddressType[]>>;
};

const CheckoutClient = ({ userId, addressPromise }: Props) => {
  const router = useRouter();
  const address = use(addressPromise);
  const { product } = useCheckoutStore();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    undefined
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    PaymentMethod | undefined
  >(undefined);
  const { setCheckoutId, clearCheckoutId } = useCheckoutSuccessStore();

  const addr = address?.data?.find((item) => item.id === selectedAddress);

  const form = useForm<z.infer<typeof CheckoutFormSchema>>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      firstName: addr?.firstName || "",
      lastName: addr?.lastName || "",
      email: addr?.email || "",
      phoneNumber: addr?.phone || "",
      region: addr?.region || "",
      city: addr?.city || "",
      zone: addr?.zone || "",
      address: addr?.address || "",
      addressType: addr?.addressType || "home",
    },
  });

  // Updating address field with preselected address
  useEffect(() => {
    form.setValue("firstName", addr?.firstName || "");
    form.setValue("lastName", addr?.lastName || "");
    form.setValue("email", addr?.email || "");
    form.setValue("phoneNumber", addr?.phone || "");
    form.setValue("region", addr?.region || "");
    form.setValue("city", addr?.city || "");
    form.setValue("zone", addr?.zone || "");
    form.setValue("address", addr?.address || "");
    form.setValue("addressType", addr?.addressType || "home");
  }, [selectedAddress]);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (product.length === 0) {
      redirect("/cart");
    }
  }, [product]);

  const shipping = 50;
  const amount = product.reduce((acc, item) => acc + item.totalPrice, 0);
  const total = amount + shipping;

  const onSubmit = async (values: z.infer<typeof CheckoutFormSchema>) => {
    try {
      setIsSubmitting(true);

      //validation
      const result = CheckoutFormSchema.safeParse(values);
      if (!result.success) {
        toast.error("Invalid form data");
        return;
      }

      const safeValue = result.data;

      const orderData = {
        totalAmount: total,
        product,
        userId: userId!,
        shippingAddress: selectedAddress,
        paymentMethod: safeValue.paymentMethod,
        orderEmail: safeValue.email,
        addressValue: {
          userId: userId!,
          firstName: safeValue.firstName,
          lastName: safeValue.lastName,
          email: safeValue.email,
          phone: safeValue.phoneNumber,
          region: safeValue.region,
          city: safeValue.city,
          zone: safeValue.zone,
          address: safeValue.address,
          addressType: safeValue.addressType,
        },
      };

      const res = await createOrder(orderData);

      if (!res?.success) {
        toast.error(res?.message || "Order failed");
        console.error(res?.error);
        return;
      }

      if (res.success && res.message === "Ok") {
        clearCheckoutId();
        setCheckoutId(res.data?.id!);

        router.push("/checkout/success");

        toast.success("Order Successful 🎉");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mt-8 checkout-container"
      >
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-primary/1 p-4 shadow rounded-md">
                <h1 className="text-2xl">Shipping Address</h1>
                <div className="space-y-4 mt-8">
                  <div className="space-y-1.5">
                    <FormField
                      control={form.control}
                      name="shippingAddressId"
                      render={({ field }) => (
                        <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                          {address.success &&
                            address.data?.map((item) => (
                              <>
                                <FormLabel className="flex shrink-0">
                                  Existing Address
                                </FormLabel>
                                <FormControl key={item.id}>
                                  <div className="flex gap-3 items-center">
                                    <Checkbox
                                      id={item.id}
                                      checked={item.id === field.value}
                                      onCheckedChange={(e) => {
                                        if (e === false) {
                                          setSelectedAddress("");
                                          field.onChange("");
                                        } else if (e === true) {
                                          setSelectedAddress(item.id);
                                          field.onChange(item.id);
                                        }
                                      }}
                                    />
                                    <Label
                                      htmlFor={item.id}
                                    >{`${item.firstName} ${item.lastName}, ${item.region}, ${item.city}, ${item.address}`}</Label>
                                  </div>
                                </FormControl>
                              </>
                            ))}

                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-8 w-full mt-8">
                    <div className="grid grid-cols-12 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                            <FormLabel className="flex shrink-0">
                              First Name*
                            </FormLabel>

                            <div className="w-full">
                              <FormControl>
                                <div className="relative w-full">
                                  <Input
                                    value={field.value}
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                  />
                                </div>
                              </FormControl>

                              <FormMessage className="text-red-500" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                            <FormLabel className="flex shrink-0">
                              Last Name*
                            </FormLabel>

                            <div className="w-full">
                              <FormControl>
                                <div className="relative w-full">
                                  <Input
                                    key="text-input-1"
                                    placeholder=""
                                    type="text"
                                    id="last-name"
                                    className=" "
                                    {...field}
                                  />
                                </div>
                              </FormControl>

                              <FormMessage className="text-red-500" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                            <FormLabel className="flex shrink-0">
                              Email*
                            </FormLabel>

                            <div className="w-full">
                              <FormControl>
                                <div className="relative w-full">
                                  <Input
                                    key="email-input-0"
                                    placeholder=""
                                    type="email"
                                    id="email"
                                    className=" "
                                    {...field}
                                  />
                                </div>
                              </FormControl>

                              <FormMessage className="text-red-500" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                            <FormLabel className="flex shrink-0">
                              Phone Number*
                            </FormLabel>

                            <div className="w-full">
                              <FormControl>
                                <div className="relative w-full">
                                  <Input
                                    key="tel-input-0"
                                    placeholder=""
                                    type="tel"
                                    id="phone-number"
                                    className=" "
                                    {...field}
                                  />
                                </div>
                              </FormControl>

                              <FormMessage className="text-red-500" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                          <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                            <FormLabel className="flex shrink-0">
                              Region*
                            </FormLabel>

                            <div className="w-full">
                              <FormControl>
                                <div className="relative w-full">
                                  <Input
                                    key="text-input-2"
                                    placeholder=""
                                    type="text"
                                    id="region"
                                    className=" "
                                    {...field}
                                  />
                                </div>
                              </FormControl>

                              <FormMessage className="text-red-500" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                            <FormLabel className="flex shrink-0">
                              City*
                            </FormLabel>

                            <div className="w-full">
                              <FormControl>
                                <div className="relative w-full">
                                  <Input
                                    key="text-input-3"
                                    placeholder=""
                                    type="text"
                                    id="city"
                                    className=" "
                                    {...field}
                                  />
                                </div>
                              </FormControl>

                              <FormMessage className="text-red-500" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zone"
                        render={({ field }) => (
                          <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                            <FormLabel className="flex shrink-0">
                              Zone*
                            </FormLabel>

                            <div className="w-full">
                              <FormControl>
                                <div className="relative w-full">
                                  <Input
                                    key="text-input-5"
                                    placeholder=""
                                    type="text"
                                    id="zone"
                                    className=" "
                                    {...field}
                                  />
                                </div>
                              </FormControl>

                              <FormMessage className="text-red-500" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                            <FormLabel className="flex shrink-0">
                              Address*
                            </FormLabel>

                            <div className="w-full">
                              <FormControl>
                                <div className="relative w-full">
                                  <Input
                                    key="text-input-4"
                                    placeholder=""
                                    type="text"
                                    id="address"
                                    className=" "
                                    {...field}
                                  />
                                </div>
                              </FormControl>

                              <FormMessage className="text-red-500" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="addressType"
                        render={({ field }) => (
                          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                            <FormLabel className="flex shrink-0">
                              Type*
                            </FormLabel>

                            <div className="w-full">
                              <FormControl>
                                <Select
                                  key="select-0"
                                  {...field}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="w-full ">
                                    <SelectValue placeholder="" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem key="home" value="home">
                                      Home
                                    </SelectItem>

                                    <SelectItem key="office" value="office">
                                      Office
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>

                              <FormMessage className="text-red-500" />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card/40 p-4 shadow rounded-md">
                <h1 className="text-2xl mb-4">Payment Method</h1>
                <div className="bg-background w-fit p-3 rounded-md shadow flex gap-2">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <>
                        <Checkbox
                          id="payment-method"
                          className="bg-background"
                          onCheckedChange={(e) => {
                            if (e === false) {
                              setSelectedPaymentMethod(undefined);
                              field.onChange(undefined);
                            } else if (e === true) {
                              field.onChange("cod");
                              setSelectedPaymentMethod("cod");
                            }
                          }}
                          required
                        />
                        <Label htmlFor="payment-method">Cash on Delivery</Label>
                      </>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="p-5 border rounded-md shadow-sm sm:p-6 sticky top-24 space-y-4">
                <h2 className="text-xl font-medium text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  {product.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 justify-between items-center"
                    >
                      <div className="relative flex gap-3 items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={90}
                          height={90}
                          className="object-cover rounded-sm overflow-hidden"
                        />
                        <p className="text-mute absolute -top-2 left-21 h-4 w-4 bg-accent rounded-full flex items-center justify-center">
                          {item.quantity}
                        </p>
                        <div>
                          <h3 className="text-sm text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-mute">
                            {item.size + " • " + item.color}
                          </p>
                        </div>
                      </div>
                      <div className="text-end">
                        <p>৳{item.totalPrice}</p>
                        <p className="text-[0.9rem] text-mute">
                          ৳{item.price} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal (selected)
                    </span>
                    <span className="text-foreground font-medium">
                      ৳{amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium">
                      {shipping > 0
                        ? `৳${shipping.toFixed(2)}`
                        : `৳${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-foreground">
                    Total
                  </span>
                  <span className="text-2xl font-semibold text-foreground">
                    ৳{total.toFixed(2)}
                  </span>
                </div>

                <Button
                  className="w-full mb-3"
                  variant={"outline"}
                  // onClick={handlePlaceOrder}
                  // disabled={!selectedPaymentMethod}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-1">
                      <Spinner />
                      Place Order
                    </div>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      </form>
    </Form>
  );
};

export default CheckoutClient;
