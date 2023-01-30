import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import router from './routes/routes.js'

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router)

app.listen(3000);
