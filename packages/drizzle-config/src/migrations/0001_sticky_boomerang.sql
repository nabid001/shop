ALTER TABLE "carts" ALTER COLUMN "colors" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "carts" ALTER COLUMN "sizes" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "price_at_add" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_product_id_user_id_colors_sizes_unique" UNIQUE("product_id","user_id","colors","sizes");