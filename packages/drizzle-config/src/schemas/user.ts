import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { AddressTable } from "./address";
import { CartTable } from "./cart";

export const userRoles = ["user", "admin"] as const;
export const userRoleEnum = pgEnum("userRole", userRoles);

export const UserTable = pgTable("users", {
  id,
  clerkId: varchar("clerkId").notNull().unique(),
  name: varchar("name").notNull(),
  username: text("username").notNull(),
  email: varchar("email").notNull().unique(),
  role: userRoleEnum().notNull().default("user"),
  picture: text("picture"),
  createdAt,
  updatedAt,
});

export const UserTableRelationships = relations(UserTable, ({ many }) => ({
  addresses: many(AddressTable),
  carts: many(CartTable),
}));
