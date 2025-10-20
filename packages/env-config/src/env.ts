import { config } from "dotenv";
import { z } from "zod";
import path from "path";

const loadEnvFiles = () => {
  const paths = [
    ".env.local",

    "../../apps/cms/.env.local",

    "../../apps/dashboard/.env.local",

    "../../apps/shop/.env.local",
  ];

  paths.forEach((envPath) => {
    try {
      config({ path: path.resolve(envPath), override: false });
    } catch (error) {
      // Silently ignore if file doesn't exist
      console.log("Failed to load env file:", error);
    }
  });
};

loadEnvFiles();

const envSchema = z.object({
  // Sanity
  SANITY_STUDIO_API_VERSION: z.string(),
  SANITY_STUDIO_SANITY_DATASET: z.string(),
  SANITY_STUDIO_SANITY_PROJECT_ID: z.string(),

  // Drizzle
  DATABASE_URL: z.string(),
});

const env = process.env;
// const env = envSchema.parse(process.env);

export const sanityEnv = {
  projectId: env.SANITY_STUDIO_SANITY_PROJECT_ID,
  dataset: env.SANITY_STUDIO_SANITY_DATASET,
  apiVersion: env.SANITY_STUDIO_API_VERSION,
};

export const databaseUrl = env.DATABASE_URL;
