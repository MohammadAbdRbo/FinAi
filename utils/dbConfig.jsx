import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://Test_owner:npg_srQzlDawp9b0@ep-long-waterfall-a29euema-pooler.eu-central-1.aws.neon.tech/Test?sslmode=require"
);
export const db = drizzle(sql, { schema });
