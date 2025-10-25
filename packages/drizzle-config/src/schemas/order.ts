import {
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";
import { AddressTable } from "./address";

export const statusEnums = pgEnum("status", [
  "pending",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
  "paid",
]);
export const oE = [
  "pending",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
  "paid",
] as const;
export const orderEnums = pgEnum("orderType", oE);

export const pE = ["cod", "bkash", "sslcommerz"] as const;
export type PaymentMethod = (typeof pE)[number];
export const paymentMethodEnum = pgEnum("paymentMethod", pE);

export const OrdersTable = pgTable("orders", {
  id,
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  orderStatus: statusEnums().notNull().default("pending"),
  totalAmount: doublePrecision("totalAmount").notNull(),
  shippingAddress: uuid("shippingAddress")
    .notNull()
    .references(() => AddressTable.id),
  createdAt,
  updatedAt,
});

export const OrderItemTable = pgTable("orderItems", {
  id,
  orderId: uuid("orderId")
    .notNull()
    .references(() => OrdersTable.id, { onDelete: "cascade" }),
  productId: text("productId").notNull(),
  quantity: integer("quantity").notNull(),
  price: doublePrecision("price").notNull(),
  color: text("color").notNull(),
  size: text("size").notNull(),
  paymentMethod: paymentMethodEnum("paymentMethod").notNull(),
  orderEmail: text("orderEmail").notNull(),
  createdAt,
  updatedAt,
});

export const orderRelations = relations(OrdersTable, ({ many }) => ({
  items: many(OrderItemTable),
}));

export const orderItemRelations = relations(OrderItemTable, ({ one }) => ({
  order: one(OrdersTable, {
    fields: [OrderItemTable.orderId],
    references: [OrdersTable.id],
  }),
}));
