const fs = require("fs");
const controllers = require("./controllers");
const portfolio = require("./portfolio");

module.exports = (app) => {
  app.get("/", controllers.index);
  app.get("/about", controllers.about);
  app.get("/contact", controllers.contact.get);
  app.post("/contact", controllers.contact.post);

  portfolio.forEach((item) => {
    app.get(`/portfolio/${item.id}`, (req, res) => {
      let { name, id } = item;

      res.render("portfolio", {...{
        page: "portfolio",
        title: `${name} | Jace Cotton`,
        partial: `portfolio/_${id}.njk`,
        localcss: fs.readFileSync("./public/css/portfolio.css"),
      }, ...item});
    });
  });

  app.get("/privacy", controllers.privacy);
  app.get("/terms", controllers.terms);
};
