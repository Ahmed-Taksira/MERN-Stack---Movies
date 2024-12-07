const express = require("express");
const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const router = express.Router();

router.post("/movies", createMovie);
router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

module.exports = router;
