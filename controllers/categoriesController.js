import { getAllCategories, getCategory,postCategory, deleteCategory, updateCategory } from "../db/queries.js";

async function appGetAllCategories(req, res) {
  const result = await getAllCategories();
  res.send(result);
}

async function appGetByCategory(req, res) {
  const { category } = req.params
  const results = await getCategory(category)
  res.render("category", { category: category, movies: results })
}

async function appNewCategoryGet(req, res) {
  res.render("newCategoryForm", {title: "Add New Category"})
}

async function appNewCategoryPost(req, res) {
  const { category } = req.body;
  await postCategory(category);
  res.redirect('/');
}

async function appDeleteCategory(req, res) {
  try {
    const { category } = req.params;
    await deleteCategory(category)
    // console.log( `${category} deleted successfully`)
    res.status(200).redirect('/');
  } catch (error) {
    console.log("Delete Error", error);
    res.status(500).send("Error deleting Item")
  }
}

async function appUpdateCategoryGet(req, res) {
  const { category } = req.params;
  res.render("updateCategoryForm", { title: "Update Category", category: category })
}

async function appUpdateCategoryPut(req, res) {
  try {
    const { category } = req.params;
    const { newCategory } = req.body;
    await updateCategory(category, newCategory);
    res.status(200).redirect('/');
  } catch (error) {
    console.error("Error updating category: ", error.message)
    res.status(500).send("Error updating category")
  }
}


export { 

  appGetAllCategories, 
  appGetByCategory, 
  appNewCategoryGet,
  appNewCategoryPost, 
  appDeleteCategory, 
  appUpdateCategoryGet,
  appUpdateCategoryPut, 
}