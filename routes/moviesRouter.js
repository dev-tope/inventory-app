import { Router } from "express";
import { appDeleteMovie, appGetAllMovies, appGetMovieById, appNewMovieGet, appNewMoviePost, appSearchMovie, appUpdateMovieGet, appUpdateMoviePost } from "../controllers/moviesController.js";

const moviesRouter = Router();

moviesRouter.get('/new', appNewMovieGet)
moviesRouter.post('/new', appNewMoviePost)
moviesRouter.post("/search", appSearchMovie)
moviesRouter.post('/delete/:movie_id', appDeleteMovie)
moviesRouter.get('/update/:movie_id', appUpdateMovieGet);
moviesRouter.post('/update/:movie_id', appUpdateMoviePost);
moviesRouter.get('/:movie_id', appGetMovieById);
moviesRouter.get('/', appGetAllMovies);


export { moviesRouter }