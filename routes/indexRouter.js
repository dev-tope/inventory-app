import { Router } from "express";
import { indexGetAllCategories } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get('/', indexGetAllCategories);

export { indexRouter }