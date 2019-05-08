const fs = require("fs");
const controllers = require("./controllers");
const portfolio = require("./portfolio");

module.exports = (app) => {
  app.get("/", controllers.index);
  app.get("/about", controllers.about);
  app.get("/contact", controllers.contact.get);
  app.post("/contact", controllers.contact.post);
  app.get("/portfolio/:itemName", controllers.portfolio);
  app.get("/privacy", controllers.privacy);
  app.get("/terms", controllers.terms);
};
