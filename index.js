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
});

app.post("/result", async (req, res) => {;
  try {
    const response = await axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${req.body.latitude}&longitude=${req.body.longitude}&maxradiuskm=${req.body.radius}`);
    res.render("result.ejs", { data: response.data });
  } catch(error) {
    res.send("Error upon sending an API request. Make sure the coordinates you sent are valid.");
  }
});

app.post("/filter", async (req, res) => {
  const url = req.body.url;
  const filterLevel = req.body.minimumMagnitude;
  try {
    const response = await axios.get(`${url}`);
    res.render("result.ejs", {data: response.data, filterLevel: filterLevel});
  } catch(error) {
    res.sendStatus(500).json(error);
  }
})

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});