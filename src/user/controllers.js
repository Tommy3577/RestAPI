const jwt = require("jsonwebtoken");
const User = require("./model");
//----------------------------------------------------------------------------------------------------
exports.createUser = async (req, res) => {
  try {
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
// exports.login = async (req, res) => {
//   try {
//     const user = await User.findOne({username: req.body.username, password: req.body.password})
//   } catch (error) {
//     console.log(error);
//     res.send({err: error})
//   }
// }
//----------------------------------------------------------------------------------------------------
exports.login = async (req, res) => {
  try {
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
  console.log("Delete User");
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
    console.log("user Update username");
    const user = await User.findOne({username: req.body.username});
    await User.updateOne({username: user.username}, {$set: {username: req.body.newUsername}});
    res.send({ msg: "This came from updateUser" });
    }
    //-------------------- 
    else if (req.body.email) {
      console.log("user Update email");
      const user = await User.findOne({email: req.body.email});
      await User.updateOne({email: user.email}, {$set: {email: req.body.newEmail}});
      res.send({ msg: "This came from updateUser" });
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
exports.putUser = async (req, res) => {
  try {
    console.log("user Put");
    const user = await User.find({username: req.body.username});
    await User.updateMany({username: user.username, email: user.email}, {$set: {username: req.body.newUsername, email: req.body.newEmail}});
    res.send({ msg: "This came from putUser" });
  }
  //-------------------- 
  catch (error) {
    console.log(error);
    res.send({ err: error });
  }
}
