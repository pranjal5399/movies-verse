const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movies: [
    {
      title: { type: String },
      img: { type: String },
      imdbID: { type: String },
    },
  ],
  username: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  public: { type: Boolean, default: true, required: true },
});

module.exports = mongoose.model("List", ListSchema);
