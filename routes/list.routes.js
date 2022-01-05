const express = require("express");
const router = express.Router();
const {
  createList,
  getListMovies,
  addMovieToList,
} = require("../controllers/list.controller");
const { isLoggedIn, isAuthorized } = require("../middleware/index");
router.post("/create", isLoggedIn, createList);
router.get("/:id", isLoggedIn, getListMovies);
router.get("/:listID/:movieID", isLoggedIn, isAuthorized, addMovieToList);
module.exports = router;
