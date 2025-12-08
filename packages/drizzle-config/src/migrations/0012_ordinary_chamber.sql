CREATE TYPE "public"."cancelReason" AS ENUM('Change of mind', 'Price is too hight');--> statement-breakpoint
ALTER TABLE "orderItems" ADD COLUMN "isCanceled" boolean;--> statement-breakpoint
ALTER TABLE "orderItems" ADD COLUMN "cancelReason" "cancelReason";