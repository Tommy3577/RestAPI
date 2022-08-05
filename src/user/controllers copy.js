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

// exports.updateUser = async (req, res) => {
//   try {
//           const updatedUserRes = await User.updateOne(
//               { username: req.body.username },
//               // { $set: { username: req.body.new_username } }
//           );
//           console.log(`The username has been updated to`);
//           // console.log(
//           //     await User.findOne({
//           //         username: req.body.new_username,
//           //     })
//           // );
//       res.send({ msg: "This came from updateUser" });
//   } 
//   catch (error) {
//       console.log(error);
//       res.send({ err: error });
//   }
// };



//----------------------------------------------------------------------------------------------------
// exports.updateUser = async (req, res) => {
//   try {
//       if (req.body.username) {
//           const updatedUserRes = await User.updateOne(
//               { username: req.body.username },
//               { $set: { username: req.body.new_username } }
//           );
//           console.log(`The username has been updated to`);
//           console.log(
//               await User.findOne({
//                   username: req.body.new_username,
//               })
//           );
//       }
//       if (req.body.email) {
//           const updatedUserRes = await User.updateOne(
//               { email: req.body.email },
//               { $set: { email: req.body.new_email } }
//           );
//           console.log(`The email has been updated in the record`);
//           console.log(
//               await User.findOne({
//                   email: req.body.new_email,
//               })
//           );
//       }
//       if (req.body.password) {
//           const updatedUserRes = await User.updateOne(
//               { password: req.body.password },
//               { $set: { password: req.body.new_password } }
//           );
//           console.log(`The password has been updated in the record`);
//           console.log(
//               await User.findOne({
//                   password: req.body.new_password,
//               })
//           );
//       } else {
//           console.log(`[info] Incorrect JSON argument for updating records`);
//       }
//       // send an object info in response
//       res.send({ msg: "This came from updateUser" });
//   } catch (error) {
//       console.log(error);
//       res.send({ err: error });
//   }
// };
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// exports.deleteUser = async (req, res) => {
//   try {
//       if (req.body.username) {
//           console.log(
//               `The following username has been deleted from the record`
//           );
//           console.log(
//               await User.findOne({
//                   username: req.body.username,
//               })
//           );
//           const deleteUserRes = await User.updateOne(
//               { username: req.body.username },
//               { $unset: { username: "" } }
//           );
//       } else if (req.body.email) {
//           console.log(`The following email has been deleted from the record`);
//           console.log(
//               await User.findOne({
//                   email: req.body.email,
//               })
//           );
//           const deleteUserRes = await User.updateOne(
//               { email: req.body.email },
//               { $unset: { email: "" } }
//           );
//       } else if (req.body.password) {
//           console.log(
//               `The following password has been deleted from the record`
//           );
//           console.log(
//               await User.findOne({
//                   password: req.body.password,
//               })
//           );
//           const deleteUserRes = await User.updateOne(
//               { password: req.body.password },
//               { $unset: { password: "" } }
//           );
//       } else {
//           console.log(`[info] Incorrect JSON argument for deleting records`);
//       }
//       // send an object info in response
//       res.send({ msg: "This came from deleteUser" });
//   } catch (error) {
//       console.log(error);
//       res.send({ err: error });
//   }
// };
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------





// // exports.createUser = async (req, res) => {
// //   try {
// //     const newUser = await User.create(req.body);
// //     console.log(newUser);
// //     res.send({ msg: "This came from createUser" });
// //   } 
// //   //-------------------- 
// //   catch (error) {
// //     console.log(error);
// //     res.send({ err: error });
// //   }
// // };

// // exports.login = async (req, res) => {
// //   try {
// //     const user = await User.findOne({username: req.body.username, password: req.body.password})
// //   } catch (error) {
// //     console.log(error);
// //     res.send({err: error})
// //   }
// // }
// //----------------------------------------------------------------------------------------------------
// exports.login = async (req, res) => {
//   try {
//     const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET); //create token with user._id inside
//     res.send({ user: req.user.username, token });
//   } 
//   //-------------------- 
//   catch (error) {
//     console.log(error);
//     res.send({ err: error });
//   }
// };
// //----------------------------------------------------------------------------------------------------

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     const result = users.map((u) => {
//       return u.username;
//     });
//     res.send({ allUsers: result });
//   }
//   //-------------------- 
//   catch (error) {
//     console.log(error);
//     res.send({ err: error });
//   }
// };

// // exports.findUser = async (req, res) => {
// //   try {
// //     console.log("findUser");
// //     // const findUser = await User.find(req.body.username);
// //     // findUser=User.findOne({username: req.body.username});
// //     // const findUser = await User.findOne({username: req.body.username, password: req.body.password})
// //     // console.log(findUser);

// //     const users = await User.find({})
// //     const result = users.map ((u) => {
// //       return u.username;
// //     })
// //     res.send ({allUsers: results})
// //     // console.log(findUser);
// //     // res.send({ msg: "This came from findUser" });
// //     } 
// //     //-------------------- 
// //     catch (error) {
// //     console.log(error);
// //     res.send({ err: error });
// //   }
// // };



// // const User = require("./model");

// // exports.createUser = async (req, res) => {
// //     try {
// //         const newUser = await User.create(req.body);
// //         console.log(newUser);
// //         res.send({ msg: "This came from createUser" });
// //     } catch (error) {console.log(error);}
// // };

// // exports.readUser = async (req, res) => {
// //     try {
// //         if (req.body.username) {
// //             userRead = await User.findOne({ username: req.body.username });
// //             console.log(userRead);
// //         } else if (req.body.email) {
// //             userRead = User.findOne({ username: req.body.email });
// //             console.log(userRead);
// //         }} catch (error) {console.log(error); res.send({ err: error });}
// //     };

// // exports.updateUser = async (req, res) => {
// //     try {
// //         const updates = {
// //             username: req.body.new_username,
// //             email: req.body.new_email,
// //             password: req.body.new_password,
// //         };
// //         await User.updateOne({ username: req.body.username }, { $set: updates });
// //         console.log(updates);
// //     } catch (error) {console.log(error); res.send({ err: error });}
// // };

// // exports.deleteUser = async (req, res) => {
// //     try {
// //         const deletes = await User.deleteOne({ username: req.body.username });
// //         console.log(deletes);
// //     } catch (error) {console.log(error); res.send({ err: error });}
// // };










// // exports.login = async (req, res) => {
// //   try {
// //     const user = await User.findOne({username: req.body.username, password: req.body.password})
// //   } catch (error) {
// //     console.log(error);
// //     res.send({err: error})
// //   }
// // }

// // const User = require('./model');

// // exports.createUser = async(req, res)=>{
// //     try {
// //         const newUser = await User.create(req.body);
// //         console.log(newUser);
// //         res.send({msg: 'This came from createUser'});
// //     } catch (error) {console.log(error);}
// // };

// // exports.readUser = async(req,res)=>{
// //     try {
// //         if(req.body.username){
// //             userRead=User.findOne({username: req.body.username});
// //             console.log(userRead);
// //         }
// //         else if(req.body.email){
// //             userRead= User.findOne({username: req.body.email});
// //             console.log(userRead);}
// //     } catch (error) {
// //         console.log(error);
// //         res.send({err: error});
// //     }
// // }



