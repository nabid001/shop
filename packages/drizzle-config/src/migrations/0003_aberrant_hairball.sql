ALTER TABLE "addresses" ADD COLUMN "First Name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "Last Name" text;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "Phone Number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "Region" text NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "City" text NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "Zone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "Address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "Landmark" text;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "Email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "Address Type" "addressType" DEFAULT 'home';--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN "fullName";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN "lastName";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN "region";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN "city";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN "zone";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN "landmark";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN "addressType";