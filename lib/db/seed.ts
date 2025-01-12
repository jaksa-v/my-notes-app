import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categories, notes } from "./schema";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  // Insert categories first
  await db.insert(categories).values([
    {
      name: "Work",
      description: "Work-related notes and tasks",
      color: "#FF0000",
    },
    {
      name: "Personal",
      description: "Personal notes and reminders",
      color: "#00FF00",
    },
    {
      name: "Ideas",
      description: "Creative ideas and brainstorming",
      color: "#0000FF",
    },
  ]);

  // Get the inserted categories
  const categoryRows = await db.select().from(categories);
  const categoryIds = categoryRows.map((row) => row.id);

  // Insert notes
  await db.insert(notes).values([
    {
      title: "Project Meeting Notes",
      content: "Discussed new features for Q1 2025",
      categoryId: categoryIds[0], // Work category
      isPinned: true,
    },
    {
      title: "Shopping List",
      content: "Groceries for the week",
      categoryId: categoryIds[1], // Personal category
      status: "active",
    },
    {
      title: "App Feature Ideas",
      content: "New features to implement in the notes app",
      categoryId: categoryIds[2], // Ideas category
      status: "active",
    },
  ]);
}

async function main() {
  try {
    await seed();
    console.log("Seed completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main();
