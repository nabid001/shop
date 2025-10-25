import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { AddressTable } from "./address";
import { CartTable } from "./cart";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const UserTable = pgTable("users", {
  id,
  clerkId: text("clerkId").notNull().unique(),
  name: text("name").notNull(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  role: roleEnum().notNull().default("user"),
  picture: text("picture"),
  createdAt,
  updatedAt,
});

export const UserTableRelationships = relations(UserTable, ({ many }) => ({
  addresses: many(AddressTable),
  carts: many(CartTable),
}));
