import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
})

app.get("/about", (req, res) => {
  res.render("about.ejs");
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})