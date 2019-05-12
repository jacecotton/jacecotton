const fs = require("fs");
const portfolio = require("./portfolio");
const nodemailer = require("nodemailer");

module.exports = {
  index: (req, res) => {
    res.render("index", {
      page: "portfolio",
      localcss: fs.readFileSync("./public/css/index.css"),
      portfolio: portfolio
    });
  },

  about: (req, res) => {
    res.render("about", {
      page: "about",
      title: "About | Jace Cotton",
      description: "Read more about Jace Cotton, web developer and designer in Houston, TX."
    });
  },

  contact: {
    get: (req, res) => {
      res.render("contact", {
        page: "contact",
        title: "Contact | Jace Cotton",
        description: "Contact Jace Cotton, web developer and designer in Houston, TX.",
        localcss: fs.readFileSync("./public/css/contact.css"),
      })
    },

    post: (req, res) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "jacedc98@gmail.com",
          pass: process.env.GMAIL_PASS
        },
      });

      let { name, email, subject, message } = req.body;

      const mailOptions = {
        from: "jacedc98@gmail.com",
        to: "jacedc98@gmail.com, fitzroy3k@gmail.com",
        subject: subject,
        html: `
          <strong>From:</strong> ${name} <br>
          <strong>Sender Email:</strong> ${email} <br>
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
    },
  },

  portfolio: (req, res) => {
    let object = portfolioQuery(req.params.itemName);

    res.render("portfolio", {...{
      page: "portfolio",
      title: `${object.name} | Jace Cotton`,
      partial: `portfolio/_${req.params.itemName}.njk`,
      localcss: fs.readFileSync("./public/css/portfolio.css"),
    }, ...object});

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

// Helper function that queries the `portfolio` array based on the dynamic URL
// parameter, matching "itemName" to `portfolio[i].id`.
function portfolioQuery(itemName) {
  for(let i = 0; i < portfolio.length; i++) {
    if(portfolio[i].id == itemName) {
      return portfolio[i];
    }
  }
}
