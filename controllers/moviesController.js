import { title } from "node:process";
import { pool } from "../db/pool.js";
import { getAllMovies, getMovieById, postMovie, deleteMovie, updateMovie, getAllCategories, searchMovie } from "../db/queries.js";

async function appGetAllMovies(req, res) {
  const results = await getAllMovies ()
  // res.json(results)
  res.render('movies', {title: "Movies", movies: results})
}

async function appGetMovieById(req, res) {
  const { movie_id } = req.params;
  const { rows } = await getMovieById(movie_id);
  const movie = rows[0]
  // console.log(movie)
  // res.json(movie)
  res.render("movie", {movie: movie})
}

async function appNewMovieGet(req, res) {
  const categories = await getAllCategories()
  // console.log(categories)
  res.render('newMovieForm', {title: "Add new movie", categories: categories})
}

async function appNewMoviePost(req, res) {
  const movie = {
    title: req.body.title,
    genre: req.body.genre,
    director: req.body.director,
    year: req.body.year,
  };
  const route = req.body.genre
  try {
    await postMovie(movie);
    res.status(200).redirect(`/categories/${route}`)
  } catch (error) {
    console.error(err);
    res.status(500).send("Error adding movie to DB")
  }
  
}

async function appDeleteMovie(req, res) {
  try {
    const { movie_id } = req.params;
    console.log(movie_id);
    await deleteMovie(movie_id);
    res.status(200).redirect('/movies');
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error deleting from DB")
  }
}

async function appUpdateMovieGet(req, res) {
  const movie_id = req.params.movie_id;
  const { rows } = await getMovieById(movie_id);
  const movie = rows[0];
  console.log(movie)
  res.render("updateMovie", { movie: movie });
}

async function appUpdateMoviePost(req, res) {
 try {
  const movie_id = req.params.movie_id;
  const { title, genre, director, year } = req.body;

  await updateMovie({movie_id, title, genre, director, year});
  res.status(200).redirect('/')

 } catch (error) {
  console.error(error.message);
  res.status(500).send("Error updating from DB")
 }
}

async function appSearchMovie(req, res) {
  try {
    const key = req.body.search;
    const movies = await searchMovie(key);
    res.status(200).render('search', { movies: movies})
  } catch (error) {
    console.log("Search error: ", error.message)
    res.status(500).send("Something went wrong with your search")
  }
}
export {
  appGetAllMovies,
  appGetMovieById,
  appNewMovieGet,
  appNewMoviePost,
  appDeleteMovie,
  appUpdateMovieGet,
  appUpdateMoviePost,
  appSearchMovie,
}