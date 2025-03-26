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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  Recipe,
  User,
};
