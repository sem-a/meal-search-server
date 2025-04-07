const { Recipe } = require("../mongoose/model");

/**
 * @route GET /api/recipes/
 * @desc Получить рецепты
 * @access Public
 */
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    return res.status(200).json(recipes);
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

  let ingredients = null;

  if (params) {
    ingredients = params.replace(/\s/g, "").replace(/_/g, " ").split(",");
  }

  try {
    let query = {};
    if (ingredients && ingredients.length > 0) {
      query = {
        "ingredients.name": { $all: ingredients },
      };
    }
    const recipes = await Recipe.find(query);

    return res.status(200).json(recipes);
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
      title: title.toLowerCase(),
      description: description.toLowerCase(),
      cuisine: cuisine.toLowerCase(),
      ingredients: ingredients.map((item) => {
        return {
          name: item.name.toLowerCase(),
          quantity: item.quantity,
          unit: item.unit,
        };
      }),
      steps: steps.map((item) => item.toLowerCase()),
      photo: photo.toLowerCase(),
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
 * @route PUT /api/recipes/edit?id
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

    const data = {
      title: body.title.toLowerCase(),
      description: body.description.toLowerCase(),
      cuisine: body.cuisine.toLowerCase(),
      ingredients: body.ingredients.map((item) => {
        return {
          name: item.name.toLowerCase(),
          quantity: item.quantity,
          unit: item.unit,
        };
      }),
      steps: body.steps.map((item) => item.toLowerCase()),
      photo: body.photo.toLowerCase(),
    };

    Object.assign(recipe, data);

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

    return res.status(204).json({
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
