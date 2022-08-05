const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movie: {
      type: String,
      unique: true,
      required: true,
    },
    //-------------------- 
    actor: {
      type: String,
      default: "Not listed"
    },
    //-------------------- 
  });
//----------------------------------------------------------------------------------------------------

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;