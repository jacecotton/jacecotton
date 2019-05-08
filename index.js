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

env.addGlobal("title", config.defaults.title);
env.addGlobal("description", config.defaults.description);
env.addGlobal("css", config.global.css);
env.addGlobal("js", config.global.js);

app.set("view engine", "njk");

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.set("port", port);

app.listen(app.get("port"), () => {
  console.log(`Server listening on http://${host}:${port}`);
});
