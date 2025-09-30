import { pgTable, text, uuid, integer } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { UserTable } from "./user";

export const CartTable = pgTable("carts", {
  id,
  productId: text("product_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),

  colors: text("colors").array().notNull(),
  sizes: text("sizes").array().notNull(),
  quantity: integer("quantity").notNull(),
  createdAt,
  updatedAt,
});

export const CartTableRelationship = relations(CartTable, ({ one }) => ({
  userId: one(UserTable, {
    fields: [CartTable.userId],
    references: [UserTable.id],
  }),
}));
