import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";

export const userAddressTypes = ["home", "office"] as const;
export type UserAddressType = (typeof userAddressTypes)[number];
export const userAddressTypeEnum = pgEnum("addressType", userAddressTypes);

export const AddressTable = pgTable("addresses", {
  id,
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  firstName: text("First Name").notNull(),
  lastName: text("Last Name"),
  phone: text("Phone Number").notNull(),
  region: text("Region").notNull(),
  city: text("City").notNull(),
  zone: text("Zone").notNull(),
  address: text("Address").notNull(),
  landmark: text("Landmark"),
  email: text("Email").notNull(),
  addressType: userAddressTypeEnum("Address Type").default("home"),
  createdAt,
  updatedAt,
});

export const AddressTableRelationship = relations(AddressTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [AddressTable.userId],
    references: [UserTable.id],
  }),
}));
