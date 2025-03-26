const { Recipe } = require("../mongoose/model");

/**
 * @route GET /api/recipes/
 * @desc Получить рецепты
 * @access Public
 */
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    return res.status(200).json({
      message: "Рецепты успешно получены!",
      recipes,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Возникла ошибка на сервере!",
      err: err.message,
    });
  }
};

/**
 * @route GET /api/recipes/get/:id
 * @desc Получить рецепт по id
 * @access Public
 */

const getRecipeForId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID рецепта отсутствует" });
  }

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        message: "Рецепта с таким ID не существует",
      });
    }

    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(500).json({
      message: "Возникла ошибка на сервере!",
      err: err.message,
    });
  }
};

/**
 * @route POST /api/recipes/search
 * @desc Искать рецепт
 * @access Public
 */
const searchRecipes = async (req, res) => {
  const { params } = req.query;

  const ingredients = params.replace(/\s/g, "").split(",");

  try {
    const query = {};
    if (ingredients && ingredients.length > 0) {
      query.ingredients = {
        $elemMatch: {
          name: { $in: ingredients },
        },
      };
    }
    const recipes = await Recipe.find(query);

    return res.status(200).json({
      message: `Рецептов найдено: ${recipes.length}`,
      recipes,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Возникла непредвиденная ошибка на сервере!",
      err,
    });
  }
};

/**
 * @route POST /api/recipes/add
 * @desc Добавить рецепт
 * @access Public
 */

const addRecipe = async (req, res) => {
  const { title, description, cuisine, ingredients, steps, photo } = req.body;

  if (!title || !description || !cuisine || !ingredients || !steps || !photo) {
    return res
      .status(400)
      .json({ message: "Заполните все обязательные поля!" });
  }

  try {
    const recipe = new Recipe({
      title,
      description,
      cuisine,
      ingredients,
      steps,
      photo,
    });

    await recipe.save();

    return res.status(201).json({
      message: "Рецепт успешно добавлен",
      recipe,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Возникла ошибка на сервере!",
      err: err.message,
    });
  }
};

/**
 * @route PUT /api/recipes/edit/:id
 * @desc Изменить рецепт
 * @access Public
 */

const editRecipe = async (req, res) => {
  const { id } = req.query;

  const body = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID рецепта отсутствует" });
  }

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        message: "Рецепта с таким ID не существует",
      });
    }

    Object.assign(recipe, body);

    await recipe.save();

    return res.status(200).json({
      message: "Рецепт успешно изменен",
      recipes: recipe,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Возникла ошибка на сервере!",
      err: err.message,
    });
  }
};

/**
 * @route DELETE /api/recipes/delete/:id
 * @desc Удалить рецепт
 * @access Public
 */

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID рецепта отсутствует" });
  }

  try {
    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({
        message: "Рецепта с таким ID не существует",
      });
    }

    return res.status(200).json({
      message: "Рецепт успешно удален",
      recipes: recipe,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Возникла ошибка на сервере!",
      err: err.message,
    });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeForId,
  addRecipe,
  editRecipe,
  deleteRecipe,
  searchRecipes,
};
