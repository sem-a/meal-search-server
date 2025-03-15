const express = require("express");
const router = express.Router();
const {
  addRecipe,
  getAllRecipes,
  getRecipeForId,
  editRecipe,
  deleteRecipe,
} = require("../controllers/recipe");

// api/recipes/
router.get("/", getAllRecipes);

// api/recipes/:id
router.get("/:id", getRecipeForId);

// api/recipes/add
router.post("/add", addRecipe);

// api/recipes/edit/:id
router.put("/edit/:id", editRecipe);

// api/recipes/delete/:id
router.delete("/delete/:id", deleteRecipe);

module.exports = router;
