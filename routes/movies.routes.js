const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/index");
const {
  searchMovie,
  getMovieById,
} = require("../controllers/movie.controller");

router.get("/search", isLoggedIn, searchMovie);

router.get("/:id", isLoggedIn, getMovieById);

module.exports = router;
