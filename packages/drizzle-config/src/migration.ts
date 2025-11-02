import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./db";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./migrations",
    });

    console.log("Migration Successful");
  } catch (error) {
    console.log("Failed To Migrate", error);
  }
};

main();
