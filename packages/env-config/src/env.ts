import { config } from "dotenv";
import { z } from "zod";
import path from "path";

const loadEnvFiles = () => {
  const paths = [
    ".env",
    ".env.local",

    "../../apps/cms/.env",
    "../../apps/cms/.env.local",

    "../../apps/dashboard/.env",
    "../../apps/dashboard/.env.local",

    "../../apps/shop/.env",
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

// const envSchema = z.object({
//   // Sanity
//   SANITY_STUDIO_API_VERSION: z.string(),
//   SANITY_STUDIO_SANITY_DATASET: z.string(),
//   SANITY_STUDIO_SANITY_PROJECT_ID: z.string(),
// });

const env = process.env;

export const sanityEnv = {
  apiVersion: env.SANITY_STUDIO_API_VERSION,
  projectId: env.SANITY_STUDIO_SANITY_PROJECT_ID,
  dataset: env.SANITY_STUDIO_SANITY_DATASET,
};
