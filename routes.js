const nodemailer = require("nodemailer");
const fs = require("fs");
const controllers = require("./controllers");
const portfolio = require("./portfolio");

module.exports = (app) => {
  app.get("/", controllers.index);
  app.get("/about", controllers.about);
  app.get("/contact", controllers.contact);

  // TO-DO: Need to break this controller into controllers.js
  app.post("/contact", (req, res) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jacedc98@gmail.com, fitzroy3k@gmail.com",
        pass: process.env.GMAIL_PASS
      }
    });

    let { name, email, message } = req.body;

    const mailOptions = {
      from: "jacedc98@gmail.com",
      to: "jacedc98@gmail.com",
      subject: "Email from personal portfolio",
      html: `
        <strong>From:</strong> ${name} <br>
        <strong>Sender email:</strong> ${email} <br>
        <strong>Message:</strong> <br>
        ${message}
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    res.render("success", {
      title: "Message Sent | Jace Cotton"
    });
  });

  portfolio.forEach((item) => {
    app.get(`/portfolio/${item.id}`, (req, res) => {
      res.render("portfolio", {
        title: `${item.name} | Jace Cotton`,
        localcss: fs.readFileSync("./public/css/portfolio.css"),
        name: item.name,
        id: `portfolio/_${item.id}.njk`,
        description: item.description,
        thumbnail: item.thumbnail
      });
    });
  });

  app.get("/privacy", controllers.privacy);
  app.get("/terms", controllers.terms);
};
