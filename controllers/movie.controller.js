const axios = require("axios");
const API_KEY = process.env.API_KEY;
const List = require("../models/list");

exports.searchMovie = async (req, res) => {
  try {
    const query = req.query.search;
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
    const { data } = await axios.get(url);
    const movies = data.Search;

    return res.render("movies/search", { movies });
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`;
    const { data } = await axios.get(url);
    const lists = await List.find({ username: req.user._id });
    return res.render("movies/show", { movie: data, lists });
  } catch (error) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};
