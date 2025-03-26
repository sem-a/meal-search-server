const express = require("express");
const router = express.Router();
const {
  addRecipe,
  getAllRecipes,
  getRecipeForId,
  editRecipe,
  deleteRecipe,
  searchRecipes,
  getRecipesForUserId,
} = require("../controllers/recipes");

// api/recipes/
router.get("/", getAllRecipes);

// api/recipes/get/:id
router.get("/get/:id", getRecipeForId);

// api/recipes/user/
router.get("/user/", getRecipesForUserId);

// api/recipes/search
router.get("/search", searchRecipes);

// api/recipes/add
router.post("/add", addRecipe);

// api/recipes/edit/:id
router.put("/edit", editRecipe);

// api/recipes/delete/:id
router.delete("/delete/:id", deleteRecipe);

module.exports = router;
