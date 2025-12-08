ALTER TABLE "orders" ALTER COLUMN "orderStatus" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "orderStatus" SET DEFAULT 'pending'::text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'shipped', 'delivered', 'cancelled', 'processing');--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "orderStatus" SET DEFAULT 'pending'::"public"."status";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "orderStatus" SET DATA TYPE "public"."status" USING "orderStatus"::"public"."status";