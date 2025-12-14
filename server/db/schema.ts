import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";

export const calculations = sqliteTable("calculations", {
    id: integer("id").primaryKey({ autoIncrement: true }),

    productName: text("product_name").notNull(),
    netAmount: real("net_amount").notNull(),
    currency: text("currency").notNull(),
    vatRate: text("vat_rate").notNull(),

    grossAmount: real("gross_amount").notNull(),
    taxAmount: real("tax_amount").notNull(),

    ip: text("ip").notNull(),
    createdAt: text("created_at").notNull(),
});
