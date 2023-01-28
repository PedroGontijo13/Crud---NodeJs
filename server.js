import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import User from "./models/user.models.js";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/create", (req, res) => {
  res.render("../views/pages/create");
});

app.post("/create", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })

  res.render('../views/pages/create')
});

app.get("/login", (req, res) => {
  res.render("../views/pages/login");
});

app.get("/read", (req, res) => {
  res.render("../views/pages/read");
});

app.get("/", (req, res) => {
  res.render("../views/pages/index");
});

app.listen(3000);
