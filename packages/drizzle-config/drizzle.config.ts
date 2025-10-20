import { defineConfig } from "drizzle-kit";
import { databaseUrl } from "@repo/env-config/env";

export default defineConfig({
  out: "./src/migrations",
  schema: "./src/schema.ts",
  dialect: "postgresql",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: databaseUrl as string,
  },
});
