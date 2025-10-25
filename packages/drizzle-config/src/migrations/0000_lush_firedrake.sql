CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."addressType" AS ENUM('home', 'office');--> statement-breakpoint
CREATE TYPE "public"."orderType" AS ENUM('pending', 'shipped', 'delivered', 'cancelled', 'refunded', 'paid');--> statement-breakpoint
CREATE TYPE "public"."paymentMethod" AS ENUM('cod', 'bkash', 'sslcommerz');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'shipped', 'delivered', 'cancelled', 'refunded', 'paid');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkId" text NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"picture" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_clerkId_unique" UNIQUE("clerkId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"fullName" text NOT NULL,
	"lastName" text,
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
CREATE TABLE "orderItems" (
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
	"userId" uuid NOT NULL,
	"orderStatus" "status" DEFAULT 'pending' NOT NULL,
	"totalAmount" double precision NOT NULL,
	"shippingAddress" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "carts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"productId" text NOT NULL,
	"userId" uuid NOT NULL,
	"color" text NOT NULL,
	"size" text NOT NULL,
	"quantity" integer NOT NULL,
	"priceAtAdd" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "carts_productId_userId_color_size_unique" UNIQUE("productId","userId","color","size")
);
--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_shippingAddress_addresses_id_fk" FOREIGN KEY ("shippingAddress") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;