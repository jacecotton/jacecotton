const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const fs = require("fs");
const nunjucks = require("nunjucks");

const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(bodyparser.json());

require("./routes")(app);

app.use(express.static(path.join(__dirname, "public")));

const env = new nunjucks.configure("views", {
  express: app,
  autoescape: false
});

env.addGlobal("title", "Jace Cotton | Web Developer and Designer");
env.addGlobal("description", "Jace Cotton is a web developer and designer in Houston, TX.");
env.addGlobal("css", fs.readFileSync("./public/css/main.css"));
// env.addGlobal("js", fs.readFileSync("./public/js/main.js"));

app.set("view engine", "njk");

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.set("port", port);

app.listen(app.get("port"), () => {
  console.log(`Server listening on http://${host}:${port}`);
});
