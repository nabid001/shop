ALTER TABLE "carts" DROP CONSTRAINT "carts_productId_userId_colors_sizes_unique";--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "color" text NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "size" text NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" DROP COLUMN "colors";--> statement-breakpoint
ALTER TABLE "carts" DROP COLUMN "sizes";--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_productId_userId_color_size_unique" UNIQUE("productId","userId","color","size");