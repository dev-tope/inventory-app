import pg from "pg";
import dotenv from "dotenv";

dotenv.config()

const { Pool } = pg;

// export const pool = new Pool ({
//   host: process.env.DEV_DATABASE_HOST,
//   database: process.env.DEV_DATABASE_NAME,
//   username: process.env.DEV_DATABASE_USER,
//   password: process.env.DEV_DATABASE_PASSWORD,
// });

// export const pool = new Pool ({
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   username: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
// });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Connected to DB:", result.rows[0]);
  } catch (err) {
    console.error("Database connection error", err)
  }
})();

