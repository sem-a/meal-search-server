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
const { auth } = require("../middleware/auth");

// api/recipes/
router.get("/", getAllRecipes);

// api/recipes/get/:id
router.get("/get/:id", getRecipeForId);

// api/recipes/user/:id
router.get("/user/:id", auth, getRecipesForUserId);

// api/recipes/search
router.get("/search", searchRecipes);

// api/recipes/add
router.post("/add", auth, addRecipe);

// api/recipes/edit/:id
router.put("/edit", auth, editRecipe);

// api/recipes/delete/:id
router.delete("/delete/:id", auth, deleteRecipe);

module.exports = router;
