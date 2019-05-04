const fs = require("fs");
const portfolio = require("./portfolio");

module.exports = {
  index: (req, res) => {
    res.render("index", {
      localcss: fs.readFileSync("./public/css/index.css"),
      portfolio: portfolio
    });
  },

  about: (req, res) => {
    res.render("about", {
      title: "About | Jace Cotton",
      description: "Read more about Jace Cotton, web developer and designer in Houston, TX."
    });
  },

  contact: (req, res) => {
    res.render("contact", {
      title: "Contact | Jace Cotton",
      description: "Contact Jace Cotton, web developer and designer in Houston, TX.",
      localcss: fs.readFileSync("./public/css/contact.css")
    });
  },

  privacy: (req, res) => {
    res.render("privacy", {
      title: "Privacy Policy | Jace Cotton"
    });
  },

  terms: (req, res) => {
    res.render("terms", {
      title: "Terms of Use | Jace Cotton"
    });
  }
};
