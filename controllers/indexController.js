import { getAllCategories } from "../db/queries.js";
import { getAllMovies } from "../db/queries.js";

async function indexGetAllCategories(req, res) {
  const categories = await getAllCategories();
  const movies = await getAllMovies()
  res.render("index", {title: "Reelix", cSection: "Categories", categories: categories, mSection: "Movies", movies: movies})
}

export{ indexGetAllCategories }