import pg from "pg";

import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT as string),
});

// Define query function with appropriate types
export const query = (
  text: string,
  params?: unknown[]
): Promise<pg.QueryResult> => {
  return pool.query(text, params);
};

export default pool;
