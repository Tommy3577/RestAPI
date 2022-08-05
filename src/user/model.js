const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  //-------------------- 
  email: {
    type: String,
    unique: true,
    required: true,
  },
  //-------------------- 
  password: {
    type: String,
    required: true,
  },
  //-------------------- 
});
//----------------------------------------------------------------------------------------------------
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
const User = mongoose.model("User", userSchema);
const Movie = mongoose.model("User", movieSchema);

module.exports = User, Movie;
