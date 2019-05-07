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
        user: "jacedc98@gmail.com",
        pass: process.env.GMAIL_PASS,
      }
    });

    let { name, email, message } = req.body;

    const mailOptions = {
      from: "jacedc98@gmail.com",
      to: "jacedc98@gmail.com, fitzroy3k@gmail.com",
      subject: "Email from personal portfolio",
      html: `
        <strong>From:</strong> ${name} <br>
        <strong>Sender email:</strong> ${email} <br>
        <strong>Message:</strong> <br>
        ${message}
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    res.render("success", {
      title: "Message Sent | Jace Cotton",
    });
  });

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
