import { unstable_cacheTag as cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { categories, notes } from "@/lib/db/schema";
import { cache } from "react";
import { eq } from "drizzle-orm";

export const getCategories = cache(async () => {
  "use cache";
  cacheTag("categories");

  const res = await db.select().from(categories);
  return res;
});

export const getNotes = cache(async () => {
  "use cache";
  cacheTag("notes");

  const res = await db.select().from(notes);
  return res;
});

export const getNote = cache(async (id: string) => {
  "use cache";
  cacheTag(`note:${id}`); // TODO: check how to set this tag

  const [note] = await db.select().from(notes).where(eq(notes.id, id)).limit(1);
  return note;
});
