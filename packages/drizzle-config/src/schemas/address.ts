import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";

export const userAddressTypes = ["home", "office"] as const;
export type UserAddressType = (typeof userAddressTypes)[number];
export const userAddressTypeEnum = pgEnum("addressType", userAddressTypes);

export const AddressTable = pgTable("addresses", {
  id,
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  region: text("region").notNull(),
  city: text("city").notNull(),
  zone: text("zone").notNull(),
  address: text("address").notNull(),
  landmark: text("landmark"),
  addressType: userAddressTypeEnum("addressType").default("home"),
  createdAt,
  updatedAt,
});

export const AddressTableRelationship = relations(AddressTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [AddressTable.userId],
    references: [UserTable.id],
  }),
}));
