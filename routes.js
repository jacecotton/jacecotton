const fs = require("fs");
const controllers = require("./controllers");
const portfolio = require("./portfolio");

module.exports = (app) => {
  app.get("/", controllers.index);
  app.get("/about", controllers.about);
  app.get("/contact", controllers.contact.get);
  app.post("/contact", controllers.contact.post);

  portfolio.forEach((item) => {
    let { name, id } = item;

    app.get(`/portfolio/${id}`, (req, res) => {
      res.render("portfolio", {...{
        page: "portfolio", // tells the menu that the "Portfolio" link is active, so all portfolio items will keep the active class on that link
        title: `${name} | Jace Cotton`,
        partial: `portfolio/_${id}.njk`,
        localcss: fs.readFileSync("./public/css/portfolio.css"),
      },...item}); // merging the data from each object in the `portfolio` array into the object passed through `res.render`, thereby exposing its properties to the njk file.
    });
  });

  app.get("/privacy", controllers.privacy);
  app.get("/terms", controllers.terms);
};
