const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cuisine: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
      unit: { type: String, required: true },
    },
  ],
  steps: [{ type: String, required: true }],
  photo: { type: String },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = {
  Recipe,
};
