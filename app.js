import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import url from "node:url";
import { indexRouter } from "./routes/indexRouter.js";
import { categoriesRouter } from "./routes/categoriesRouter.js";
import { moviesRouter } from "./routes/moviesRouter.js";

dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const assestpath = path.join(__dirname, "public")

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
//Routes
app.get('/', indexRouter)
app.use("/categories", categoriesRouter);
app.use("/movies", moviesRouter)


//views config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(express.static(path.join(__dirname, 'dist')))

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
})