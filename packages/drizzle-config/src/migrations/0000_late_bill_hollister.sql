CREATE TYPE "public"."userRole" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."addressType" AS ENUM('home', 'office');--> statement-breakpoint
CREATE TYPE "public"."orderType" AS ENUM('pending', 'shipped', 'delivered', 'cancelled', 'refunded', 'paid');--> statement-breakpoint
CREATE TYPE "public"."paymentMethod" AS ENUM('cod', 'bkash', 'sslcommerz');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'shipped', 'delivered', 'cancelled', 'refunded', 'paid');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkId" varchar NOT NULL,
	"name" varchar NOT NULL,
	"username" text NOT NULL,
	"email" varchar NOT NULL,
	"role" "userRole" DEFAULT 'user' NOT NULL,
	"picture" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_clerkId_unique" UNIQUE("clerkId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"full_name" text NOT NULL,
	"phone" text NOT NULL,
	"region" text NOT NULL,
	"city" text NOT NULL,
	"zone" text NOT NULL,
	"address" text NOT NULL,
	"landmark" text,
	"addressType" "addressType" DEFAULT 'home',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orderId" uuid NOT NULL,
	"productId" text NOT NULL,
	"quantity" integer NOT NULL,
	"price" double precision NOT NULL,
	"color" text NOT NULL,
	"size" text NOT NULL,
	"paymentMethod" "paymentMethod" NOT NULL,
	"orderEmail" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"orderStatus" "status" DEFAULT 'pending' NOT NULL,
	"total_amount" double precision NOT NULL,
	"shipping_address" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "carts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"colors" text[] NOT NULL,
	"sizes" text[] NOT NULL,
	"quantity" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_address_addresses_id_fk" FOREIGN KEY ("shipping_address") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;