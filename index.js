const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const fs = require("fs");
const nunjucks = require("nunjucks");
const config = require("./config");

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

// Default values for basic configurations like the site title and meta description
// that may be overridden on a page-by-page basis (in controllers.js).
for(let prop in config.defaults) {
  env.addGlobal(prop, config.defaults[prop]);
}

// Global variables for inclusion on every page that won't be overridden on a page-
// by-page basis.
for(let prop in config.globals) {
  env.addGlobal(prop, config.globals[prop]);
}

app.set("view engine", "njk");

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.listen(port, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
