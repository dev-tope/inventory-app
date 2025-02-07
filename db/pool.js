import pg from "pg";
import dotenv from "dotenv";

dotenv.config()

const { Pool } = pg;

export const pool = new Pool ({
  host: process.env.DEV_DATABASE_HOST,
  database: process.env.DEV_DATABASE_NAME,
  username: process.env.DEV_DATABASE_USER,
  password: process.env.DEV_DATABASE_PASSWORD,
});



(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Connected to DB:", result.rows[0]);
  } catch (err) {
    console.error("Database connection error", err)
  }
})();

