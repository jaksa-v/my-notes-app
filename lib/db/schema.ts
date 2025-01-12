import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const noteStatusEnum = pgEnum("note_status", [
  "active",
  "archived",
  "deleted",
]);
export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color").notNull().default("#000000"),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  categoryId: uuid("category_id").references(() => categories.id),
  status: noteStatusEnum("status").notNull().default("active"),
  isPinned: boolean("is_pinned").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type Category = typeof categories.$inferSelect;
export type Note = typeof notes.$inferSelect;
