ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "orderItems" ADD COLUMN "orderedBy" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderedBy_users_id_fk" FOREIGN KEY ("orderedBy") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItems" DROP COLUMN "userId";