import * as schema from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { databaseUrl } from "@repo/env-config/env";

const sql = neon(databaseUrl as string);
export const db = drizzle({ client: sql, schema });
