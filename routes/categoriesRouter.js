import { Router } from "express";
import { appDeleteCategory, appGetAllCategories, appGetByCategory, appNewCategoryGet, appNewCategoryPost, appUpdateCategoryGet, appUpdateCategoryPut } from "../controllers/categoriesController.js";


const categoriesRouter = Router();

categoriesRouter.get('/new', appNewCategoryGet);
categoriesRouter.post('/new', appNewCategoryPost);
categoriesRouter.get('/update/:category', appUpdateCategoryGet)
categoriesRouter.post('/update/:category', appUpdateCategoryPut)
categoriesRouter.post('/delete/:category', appDeleteCategory)
categoriesRouter.get('/:category', appGetByCategory);
categoriesRouter.get('/', appGetAllCategories);

export { categoriesRouter };
