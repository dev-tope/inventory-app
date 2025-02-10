#! /usr/bin/env node

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Client } = pg;

// const host = process.env.DEV_DATABASE_HOST;
// const user = process.env.DEV_DATABASE_USER;
// const password = process.env.DEV_DATABASE_PASSWORD;
// const port = process.env.DEV_DATABASE_PORT;
// const db_name = process.env.DEV_DATABASE_NAME

// const host = process.env.PGHOST;
// const db_name = process.env.PGDATABASE;
// const user = process.env.PGUSER;
// const password= process.env.PGPASSWORD;
// const port = process.env.PGPORT

const SQL = `
CREATE TABLE IF NOT EXISTS movie_categories (
  category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category VARCHAR ( 255 )
);
CREATE TABLE IF NOT EXISTS movie_details (
  movie_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (255),
  genre VARCHAR (255),
  director VARCHAR (255),
  year INTEGER
);
INSERT INTO movie_categories (category)
VALUES
  ('drama'),
  ('thriller'),
  ('action'),
  ('fantasy'),
  ('science fiction'),
  ('animation');
INSERT INTO movie_details (title, genre, director, year)
VALUES
  ('the shawshank redemption', 'drama', 'frank darabont', 1996),
  ('GoodFellas', 'drama', 'martin scorsese', 1990),
  ('Mystic River', 'thriller', 'clint eastwood', 2003),
  ('Primal Fear', 'drama', 'gregory hoblit', 1996),
  ('The Godfather', 'drama', 'francis coppola', 1972),
  ('Schindlers List', 'drama', 'steven spielberg', 1995),
  ('City of God', 'drama', 'fernando meirelles', 2002),
  ('Interstellar', 'science fiction', 'christopher nolan', 2014),
  ('Heat', 'action', 'michael mann', 1995),
  ('UP', 'animation', 'pete docter', 2009),
  ('Lord of the Rings', 'fantasy', 'peter jackson', 2001);
`;

async function main() {
  console.log("seeding...")
  try {
    const client = new Client({
      // connectionString: `postgresql://${user}:${password}@${host}:${port}/${db_name}`
      connectionString: process.env.DATABASE_PUBLIC_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Completed")
  } catch(err) {
    console.error("DB Connection Error", err)
  }
}

main()