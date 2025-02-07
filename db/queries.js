import { pool } from "./pool.js";

async function getAllCategories() {
  try {
    const { rows } = await pool.query("SELECT * FROM movie_categories");
    return rows;
  } catch (error) {
    console.error("Error fetching Categories from DB:", error.message)
    throw error;
  }
}

async function getCategory(category) {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM movie_categories
      INNER JOIN movie_details
      ON movie_categories.category = movie_details.genre
      WHERE category = $1;
      `,
    [category]);
  
    return rows;
    
  } catch (error) {
    console.error(`Error fetching ${category} from DB:`, error.message)
    throw error;
  }
}

async function postCategory(category) {
  try {
    await pool.query("INSERT INTO movie_categories (category) VALUES ($1)", [category]);
    console.log(`Inserted ${category} successfully`)
  } catch (error) {
    console.error("Error Inserting category", error.message);
    throw error;
  }
}

async function deleteCategory(category) {
  try {
    await pool.query("DELETE FROM movie_categories WHERE movie_categories.category = $1", [category])
    // console.log( `${category} deleted successfully`)
  } catch (error) {
    console.error("DELETE operation failed", error.message);
    throw error;
  }
}

async function updateCategory(oldCategory, newCategory) {
  try {
    await pool.query(
      `
      UPDATE movie_categories
      SET category = $1
      WHERE category = $2
      `, 
      [newCategory, oldCategory]
    );
    console.log("Updated row successfully")
  } catch (error) {
    console.error("Error updating category", error.message);
    throw error;
  }
}
//MOVIES QUERY
async function getAllMovies() {
  try {
    const { rows } = await pool.query("SELECT * FROM movie_details");
    return rows;
  } catch (error) {
    console.error("Error getting all movies", error.message);
    throw error
  }
}

async function getMovieById(movie_id) {
  try {
    const row = await pool.query(`
      SELECT * FROM movie_details
      WHERE movie_id = $1
      `, 
      [movie_id]
    );
    return row;

  } catch (error) {
    console.error("Error getting movie",error.message)
  }
}
async function postMovie(movie) {
  try {
    await pool.query(
      `
      INSERT INTO movie_details (title, genre, director, year) 
      VALUES ($1, $2, $3, $4)
      `,
      [
      movie.title,
      movie.genre,
      movie.director,
      movie.year
      ]
    );
  } catch {
    console.error("Error adding movie to DB: ", error.message);
    throw error;
  }
}

async function deleteMovie(movie_id) {
  try {
    await pool.query(
      `
      DELETE FROM movie_details 
      WHERE movie_details.movie_id = $1
      `, 
      [movie_id]
    );
  } catch (error) {
    console.error("Error deleting movie from DB: ", error.message) 
    throw error
  }
}

async function updateMovie({
  movie_id,
  title,
  genre,
  director,
  year,
}) {

  const updates = [];
  const values = [];
  let index = 1;

  if(title) {
    updates.push(`title = $${index++}`)
    values.push(title)
  }

  if(genre) {
    updates.push(`genre = $${index++}`)
    values.push(genre)
  }

  if(director) {
    updates.push(`director = $${index++}`)
    values.push(director)
  }

  if(year) {
    updates.push(`year = $${index++}`)
    values.push(year)
  }

  try {
    if (updates.length > 0) {
      const query = `
        UPDATE movie_details
        SET ${updates.join(", ")}
        WHERE movie_id = $${index}
      `;
      values.push(movie_id);
      await pool.query(query, values)
    } else {
      console.log("ERROR: No Updates")
    }
  } catch (error) {
    console.error("Error updating movie: ", console.error) 
    throw error
  }
}

async function searchMovie(key) {
  try {
    const { rows } = await pool.query(
      `
      SELECT * FROM movie_details
      WHERE movie_details.title LIKE $1
      `,
      [`%${key}%`]
    );
    return rows;
  } catch (error) {
    console.error("Error running search: ", error.message);
    throw error;
  }
}

// async function updateMovies
export { 
  getAllCategories, 
  getCategory, 
  postCategory, 
  deleteCategory, 
  updateCategory,
  getAllMovies,
  getMovieById,
  postMovie,
  deleteMovie,
  updateMovie,
  searchMovie,
}