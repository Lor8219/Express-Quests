require("dotenv").config();
const port = process.env.APP_PORT ?? 5000;
const database = require("./database");
const express = require("express");
const app = express();
const { hashPassword } = require("./auth.js");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);


const movieHandlers = require("./movieHandlers");

// app.get("/api/movies", movieHandlers.getMovies);
// app.get("/api/movies/:id", movieHandlers.getMovieById);
// app.post("/api/movies", movieHandlers.postMovie);
// app.put("/api/movies/:id", movieHandlers.updateMovie);
// app.delete("/api/movies/:id", movieHandlers.deleteMovie);


const UserHandlers= require("./userHandlers");

app.get("/api/users", UserHandlers.getUsers);
app.get("/api/users/:id", UserHandlers.getUsersById);
app.post("/api/users", UserHandlers.postUser);
app.put("/api/users/:id", UserHandlers.updateUser);
app.delete("/api/users/:id", UserHandlers.deleteUser);
// app.post("/api/users", hashPassword, UserHandlers.postUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
