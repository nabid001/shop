import {
  boolean,
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
import { userAddressTypeEnum } from "./address";

export const statusEnums = pgEnum("status", [
  "pending",
  "shipped",
  "delivered",
  "cancelled",
  "processing",
]);

export const pE = ["cod", "bkash", "sslcommerz"] as const;
export type PaymentMethod = (typeof pE)[number];
export const paymentMethodEnum = pgEnum("paymentMethod", pE);

export const cancelReason = ["Change of mind", "Price is too hight"] as const;
export type CancelReason = (typeof cancelReason)[number];
export const cancelReasonEnum = pgEnum("cancelReason", cancelReason);

export const OrdersTable = pgTable("orders", {
  id,
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  orderStatus: statusEnums().notNull().default("pending"),
  totalAmount: doublePrecision("totalAmount").notNull(),
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
  paymentMethod: paymentMethodEnum("paymentMethod").notNull(),
  isCanceled: boolean("isCanceled"),
  cancelReason: cancelReasonEnum(),
  createdAt,
  updatedAt,
});

export const OrderItemTable = pgTable("orderItems", {
  id,
  orderId: uuid("orderId")
    .notNull()
    .references(() => OrdersTable.id, { onDelete: "cascade" }),
  orderedBy: uuid("orderedBy")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  productId: text("productId").notNull(),
  quantity: integer("quantity").notNull(),
  price: doublePrecision("price").notNull(),
  color: text("color").notNull(),
  size: text("size").notNull(),
  createdAt,
  updatedAt,
});

export const orderRelations = relations(OrdersTable, ({ many, one }) => ({
  items: many(OrderItemTable),
  user: one(UserTable, {
    fields: [OrdersTable.userId],
    references: [UserTable.id],
  }),
}));

export const orderItemRelations = relations(OrderItemTable, ({ one }) => ({
  order: one(OrdersTable, {
    fields: [OrderItemTable.orderId],
    references: [OrdersTable.id],
  }),
}));
