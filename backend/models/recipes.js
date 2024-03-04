const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  media: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },  
  ingredients: [
    {
      ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredients', required: true },
      quantity: { type: String, required: true },
    }
  ],
  preparation: { type: String, required: true },
  publicationDate: { type: Date, default: Date.now, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      comment: { type: String, required: true },
      publicationDate: { type: Date, default: Date.now, required: true },
    }
  ],
  saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
