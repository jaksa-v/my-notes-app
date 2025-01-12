import { unstable_cacheTag as cacheTag } from "next/cache";
import { db } from ".";
import { categories, notes } from "./schema";
import { cache } from "react";

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
