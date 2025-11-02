ALTER TABLE "orders" DROP CONSTRAINT "orders_shippingAddress_addresses_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "First Name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "Last Name" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "Phone Number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "Region" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "City" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "Zone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "Address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "Landmark" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "Email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "Address Type" "addressType" DEFAULT 'home';--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "paymentMethod" "paymentMethod" NOT NULL;--> statement-breakpoint
ALTER TABLE "orderItems" DROP COLUMN "paymentMethod";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "shippingAddress";