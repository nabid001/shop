import { pgTable, text, uuid, integer, unique } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { UserTable } from "./user";

export const CartTable = pgTable(
  "carts",
  {
    id,
    productId: text("productId").notNull(),
    userId: uuid("userId")
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),

    color: text("color").notNull(),
    size: text("size").notNull(),
    quantity: integer("quantity").notNull(),
    priceAtAdd: integer("priceAtAdd").notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [
    unique().on(table.productId, table.userId, table.color, table.size),
  ]
);

export const CartTableRelationship = relations(CartTable, ({ one }) => ({
  userId: one(UserTable, {
    fields: [CartTable.userId],
    references: [UserTable.id],
  }),
}));
