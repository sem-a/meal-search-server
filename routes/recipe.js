const express = require("express");
const { addRecipe } = require("../controllers/recipe");
const router = express.Router();

router.get("/", function (req, res, next) {});

router.post("/add", addRecipe);

module.exports = router;
