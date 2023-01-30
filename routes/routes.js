import express from 'express'
import User from "../models/user.models.js";
import Comments from "../models/comment.model.js";

const router = express.Router()
//Main page

router.get("/", (req, res) => {
  res.render("../views/pages/index");
});

//Create methods -> Create a user in db with the form data

router.get("/create", (req, res) => {
  res.render("../views/pages/create");
});

router.post("/create", (req, res) => {
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

router.get("/comments", (req, res) => {
  Comments.findAll().then((comments) => {
    const commentsArray = comments.map((comment) => comment.dataValues);
    res.render("../views/pages/comment", { Comments: commentsArray });
  });
});

router.post("/comments", (req, res) => {
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

router.get("/read", (req, res) => {
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

router.get("/update", (req, res) => {
  res.render("../views/pages/update");
});

router.post("/update", (req, res) => {
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

router.get("/delete", (req, res) => {
  res.render("../views/pages/delete");
});

router.post("/delete", (req, res) => {
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

// Export the router
export default router