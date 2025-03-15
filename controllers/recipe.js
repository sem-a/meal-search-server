const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/recipes/
 * @desc Получить рецепты
 * @access Public
 */
const getAllRecipes = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Рецепты получены",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Возникла ошибка на сервере!",
      err: err.message,
    });
  }
};

/**
 * @route GET /api/recipes/:id
 * @desc Получить рецепт по id
 * @access Public
 */

const getRecipeForId = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Рецепт получен по айди",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Возникла ошибка на сервере!",
      err: err.message,
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
    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        cuisine,
        ingredients,
        steps,
        photo,
      },
    });
    return res.status(201).json({
      message: "Рецепт успешно добавлен",
      recipe,
    });
  } catch (err) {
    console.log(err)
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
  try {
    return res.status(200).json({
      message: "Рецепт успешно изменен",
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
  try {
    return res.status(200).json({
      message: "Рецепт успешно удален",
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
};
