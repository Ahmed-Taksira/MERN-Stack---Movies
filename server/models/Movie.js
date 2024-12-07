const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  poster: { type: String, required: false }, // Stores Base64-encoded string
});

module.exports = mongoose.model("Movie", movieSchema);
