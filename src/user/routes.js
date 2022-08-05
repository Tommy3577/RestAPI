const { Router } = require("express");
const userRouter = Router();
const { createUser, login, getAllUsers, updateUser, deleteUser, createMovie, getMovie, patchMovie, deleteMovie} = require("./controllers");
const { hashPass, comparePass, tokenCheck, passHashUpdate } = require("../middleware");
// findUser controller
// request response

//Create
userRouter.post("/user", hashPass, createUser);
userRouter.post("/login", comparePass, login);
userRouter.post("/movie", createMovie);
//-------------------- 
//Read
userRouter.get("/user", getAllUsers);
userRouter.get("/login", tokenCheck, login);
userRouter.get("/movie", getMovie);
//-------------------- 
//Update
userRouter.patch("/user", passHashUpdate, updateUser); 
userRouter.patch('/movie', patchMovie);
//-------------------- 
//Delete
userRouter.delete('/user', deleteUser);
userRouter.delete('/movie', deleteMovie);
//-------------------- 
//generate a token on createUser and login, token should include unique info from db entry, token should be in response
//have an endpoint that finds a user in the db, using the id from token
module.exports = userRouter;


// {
//     "username": "user3",
//     "email": "someone3@email.com",
//     "password": "password"
//     }


// {
// "username": "user11"
// "password": "password"
// "newPassword": "newpassword"
// }
// http://localhost:5001/user
// node src\server.js


// const loginFetch = async (username, pass) => {
//     const res = await fetch("http://localhost:5001/login", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//             username: username,
//             password: pass
//         })
//     })
//     const data = await res.json()
//     data.user
//     data.token
// } This is for next week, only in React app



