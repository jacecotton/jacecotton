const fs = require("fs");

module.exports = {
  defaults: {
    title: "Jace Cotton | Web Developer and Designer",
    description: "Jace Cotton is a web developer and designer in Houston, TX.",
  },

  global: {
    css: fs.readFileSync("./public/css/main.css"),
    js: (fs.readFileSync("./public/js/non-critical-css.js") + (fs.readFileSync("./public/js/has-js.js")))
  }
};
