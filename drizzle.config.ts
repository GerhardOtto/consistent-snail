import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// We add this to fix issue since env is .env.local and not .env
// dotenv.config({ path: '.env.local' })

export default defineConfig({
  out: "./drizzle",
  schema: "./utils/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});