import { UserRole } from "@/drizzle/schema";

export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: UserRole;
      userId?: string;
    };
  }

  interface UserPublicMetadata {
    role?: UserRole;
    userId?: string;
  }
}
