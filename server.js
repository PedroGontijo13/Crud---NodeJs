import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import User from "./models/user.models.js";
import Comments from "./models/comment.model.js";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Main page

app.get("/", (req, res) => {
  res.render("../views/pages/index");
});

//Create methods -> Create a user in db with the form data

app.get("/create", (req, res) => {
  res.render("../views/pages/create");
});

app.post("/create", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      res.redirect("/create");
    })
    .catch((err) => {
      console.error(err);
    });
});

//Comment -> Post the comment on the database and show on the web page

app.get("/comments", (req, res) => {
  Comments.findAll().then((comments) => {
    const commentsArray = comments.map((comment) => comment.dataValues);
    res.render("../views/pages/comment", { Comments: commentsArray });
  });
});

app.post("/comments", (req, res) => {
  Comments.create({
    username: req.body.username,
    comment: req.body.comment,
  }).then(() => {
    Comments.findAll().then((comments) => {
      const commentsArray = comments.map((comment) => comment.dataValues);
      res.render("../views/pages/comment", { Comments: commentsArray });
    });
  });
});

//Read method -> Show the users in the page

app.get("/read", (req, res) => {
  User.findAll()
    .then((users) => {
      const userArray = users.map((user) => user.dataValues);
      console.log(userArray);
      res.render("../views/pages/read", { users: userArray });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});

//update methods

app.get("/update", (req, res) => {
  res.render("../views/pages/update");
});

app.post("/update", (req, res) => {
  User.update(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    {
      where: { id: req.body.id },
    }
  )
    .then(() => {
      res.render("../views/pages/update");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});

//Delete methods

app.get("/delete", (req, res) => {
  res.render("../views/pages/delete");
});

app.post("/delete", (req, res) => {
  User.destroy({
    where: { id: req.body.id },
  })
    .then(() => {
      console.log("Deleted");
      res.render("../views/pages/delete");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});

app.listen(3000);
