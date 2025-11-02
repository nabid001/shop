ALTER TABLE "orders" DROP CONSTRAINT "orders_shippingAddress_addresses_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_shippingAddress_addresses_id_fk" FOREIGN KEY ("shippingAddress") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;