const Movie = require("../models/Movie");

exports.createMovie = async (req, res) => {
  try {
    const { title, publishedYear, poster } = req.body;
    const movie = new Movie({ title, publishedYear, poster });
    await movie.save();

    res.status(201).json({ message: "Movie created successfully!", movie });
  } catch (error) {
    res.status(500).json({ message: "Error creating movie", error });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving movies", error });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving movie", error });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, publishedYear, poster } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, publishedYear, poster },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Movie updated successfully!", updatedMovie });
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);

    res.status(200).json({ message: "Movie deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};
