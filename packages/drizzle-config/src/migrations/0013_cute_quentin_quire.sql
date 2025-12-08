ALTER TABLE "orders" ADD COLUMN "isCanceled" boolean;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "cancelReason" "cancelReason";--> statement-breakpoint
ALTER TABLE "orderItems" DROP COLUMN "isCanceled";--> statement-breakpoint
ALTER TABLE "orderItems" DROP COLUMN "cancelReason";