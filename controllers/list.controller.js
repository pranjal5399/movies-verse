const List = require("../models/list");
const { API_KEY } = process.env;
const axios = require("axios");

exports.createList = async (req, res) => {
  try {
    const { name, type } = req.body;
    const user = req.user;
    let public = true;
    if (type === "private") public = false;
    //console.log({ name, public, username: user._id });
    const newList = new List({ name, public, username: user._id });
    await newList.save();
    return res.redirect("/");
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};

exports.getListMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, movies, username, public } = await List.findById(id);
    if (!public && username.toString() != req.user._id.toString()) {
      req.flash("error", "Not authorized to view the list");
      return res.redirect("/");
    }
    console.log(name);
    return res.render("list/show", { movies, listName: name });
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};

exports.addMovieToList = async (req, res) => {
  try {
    const { listID, movieID } = req.params;
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`;
    const { data } = await axios.get(url);
    const newMovie = {
      title: data.Title,
      img: data.Poster,
      imdbID: data.imdbID,
    };
    const list = await List.findById(listID);
    const filtered = list.movies.filter((movie) => movie.imdbID === movieID);

    if (filtered.length > 0) {
      req.flash("error", "Movie already added to this list");
      return res.redirect(`/movies/${movieID}`);
    }

    const newList = list;
    //console.log(newList, data);
    newList.movies.push(newMovie);
    const updatedList = await List.findByIdAndUpdate(listID, newList, {
      new: true,
    });
    if (!updatedList) {
      req.flash("error", "Unable to add to list");
    } else {
      req.flash("success", "Added to List!");
    }
    return res.redirect(`/movies/${movieID}`);
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect(`/movies/${movieID}`);
  }
};
