ALTER TABLE "carts" DROP CONSTRAINT "carts_product_id_user_id_colors_sizes_unique";--> statement-breakpoint
ALTER TABLE "carts" DROP CONSTRAINT "carts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "productId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "userId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "priceAtAdd" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carts" DROP COLUMN "product_id";--> statement-breakpoint
ALTER TABLE "carts" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "carts" DROP COLUMN "price_at_add";--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_productId_userId_colors_sizes_unique" UNIQUE("productId","userId","colors","sizes");