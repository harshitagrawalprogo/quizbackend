import { ENV } from "./env.js";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema.js";

export const db = drizzle(neon(ENV.DB_URL), { schema });
