const jwt = require("jsonwebtoken");
const User = require("./model");
const Movie = require("./movieModel");

//----------------------------------------------------------------------------------------------------
exports.createUser = async (req, res) => {
  try {
    console.log("Create User Function")
    const newUser = await User.create(req.body);
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET); //create token with user._id inside
    //generate token using newUser._id
    res.send({ msg: "This came from createUser", token }); //send success message and token back in the response
  } 
  //-------------------- 
  catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};
//----------------------------------------------------------------------------------------------------
exports.login = async (req, res) => {
  try {
    console.log("Login Function")
    const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET); //create token with user._id inside
    res.send({ user: req.user.username, token });
  } 
  //-------------------- 
  catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};
//----------------------------------------------------------------------------------------------------
exports.getAllUsers = async (req, res) => {
  try {
    console.log("Get All Users Function")
    const users = await User.find({});
    const result = users.map((u) => {
      return u.username;
    });
    res.send({ allUsers: result });
  } 
  //-------------------- 
  catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};
//----------------------------------------------------------------------------------------------------
// exports.updateUser = async (req,res) => {
//   try {
//       console.log("updateUser");
//       const updateUser = { username: req.body.new_username, email: req.body.new_email, password: req.body.new_password, };
//       await User.updateOne({ username: req.body.username }, { $set: updateUser });
//       console.log(updateUser);
//       } 
//       //-------------------- 
//       catch (error) {
//       console.log(error);
//       res.send({ err: error });
//     }
// };
//----------------------------------------------------------------------------------------------------
exports.deleteUser = async (req, res) => {
  try {
  console.log("Delete User Function");
  await User.deleteOne({ username: req.body.username })
  res.send({ msg: "This came from deleteUser" });
}
//-------------------- 
catch (error) {
  console.log(error);
  res.send({ err: error });
}
};
//----------------------------------------------------------------------------------------------------
exports.updateUser = async (req, res) => {
  try {
    if (req.body.username) {
    console.log("User Update Username Function1");
    const user = await User.findOne({username: req.body.username});
    await User.updateOne({username: user.username}, {$set: {username: req.body.newUsername}});
    
    if (req.body.password) {
      console.log("User Update Password Function");
      // const user = await User.findOne({username: req.body.username})
      req.user = await User.findOne({ username: req.body.username})
      console.log(req.body.password);
      console.log(req.user.password);
      await User.updateOne({password: user.password}, {$set: {password: req.body.newPassword}})
      const newPass = req.body.newPassword;             //grab value
      console.log(newPass)
      // res.send({ msg: "This came from updatedPassword"})
    }
    res.send({ msg: "This came from updateUser" });
    }
    //-------------------- 
    else if (req.body.email) {
      console.log("User Update Email Function");
      // let oldName = req.body.email
      // let newName = req.body.newEmail
      const user = await User.findOne({email: req.body.email});
      await User.updateOne({email: user.email}, {$set: {email: req.body.newEmail}});
      res.send({ msg: "This came from updatedEmail" });
    }
    //-------------------- 
    else
    {
      console.log ("Invalid Command");
    }
  }
  //-------------------- 
  catch (error) {
    console.log(error);
    res.send({ err: error });
  }
}
//----------------------------------------------------------------------------------------------------
// exports.updatePass = async (req, res) => {
//   try {
//     if (req.body.password) {
//       console.log("User Update Password Function");
//       const user = await User.findOne({username: req.body.username})
//       await User.updateOne({password: user.password}, {$set: {password: req.body.newPassword}})
//       res.send({ msg: "This came from updatedPassword"})
//     }
//     //-------------------- 
//     else
//     {
//       console.log ("Invalid Command");
//     }
//   }
//   //-------------------- 
//   catch (error) {
//     console.log(error);
//     res.send({ err: error });
//   }
// }
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// exports.updateUser = async (req, res) => {
//   try {
//     if (req.body.username) {
//     console.log("User Update Username Function");
//     const user = await User.findOne({username: req.body.username});
//     await User.updateOne({username: user.username}, {$set: {username: req.body.newUsername}});
//     res.send({ msg: "This came from updateUser" });
//     }
//     //-------------------- 
//     else if (req.body.email) {
//       console.log("User Update Email Function");
//       const user = await User.findOne({email: req.body.email});
//       await User.updateOne({email: user.email}, {$set: {email: req.body.newEmail}});
//       res.send({ msg: "This came from updateUser" });
//     }
//     //-------------------- 
//     else if (req.body.password) {
//       console.log("User Update Password Function");
//       const user = await User.findOne({username: req.body.password})
//       await User.updateOne({password: user.password}, {$set: {password: req.body.newPassword}})
//       res.send({ msg: "Password Updated"})
//     }
//     //-------------------- 
//     else
//     {
//       console.log ("Invalid Command");
//     }
//   }
//   //-------------------- 
//   catch (error) {
//     console.log(error);
//     res.send({ err: error });
//   }
// }
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
exports.createMovie = async (req, res) => {
  try {
    console.log("Create Movie Function")
    // const newMovie = await Movie.create(req.body);
    await Movie.create(req.body);
    res.send({ msg: "This came from createMovie" });
  } 
  //-------------------- 
  catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};
//----------------------------------------------------------------------------------------------------
exports.getMovie = async (req, res) => {
  try {
    console.log("Get Movies Function")
    const movie = await Movie.find({});
    const result = movie.map((m) => {
      return m.movie;
    });
    res.send({ getAllMovies: result });
  } 
  //-------------------- 
  catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};
//----------------------------------------------------------------------------------------------------
exports.deleteMovie = async (req, res) => {
  try {
  console.log("Delete Movie Function");
  await Movie.deleteOne({ movie: req.body.movie })
  res.send({ msg: "This came from deleteMovie" });
}
//-------------------- 
catch (error) {
  console.log(error);
  res.send({ err: error });
}
};
//----------------------------------------------------------------------------------------------------
exports.patchMovie = async (req, res) => {
  try {
    console.log("Update Movies Function");
    if (req.body.newMovie) {
    console.log("Update Movie");
    const movie = await Movie.findOne({movie: req.body.movie});
    await Movie.updateOne({movie: movie.movie}, {$set: {movie: req.body.newMovie}});
    res.send({ msg: "This came from update Movie" });
    }
    //-------------------- 
    else if (req.body.newActor) {
      console.log("Update Actor Function");
      const movie = await Movie.findOne({actor: req.body.actor});
      await Movie.updateOne({actor: movie.actor}, {$set: {actor: req.body.newActor}});
      res.send({ msg: "This came from update Actor" });
    }
    else
    {
      console.log ("Invalid Command");
    }
  }
  //-------------------- 
  catch (error) {
    console.log(error);
    res.send({ err: error });
  }
}
