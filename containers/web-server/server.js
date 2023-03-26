const express = require("express");
const app = express();
const request = require("request");
const port = 80;
const domains = require("./secrets.js");
var favicon = require("serve-favicon");

app.use(favicon("./img/tyler.ico"));

//engine setup
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//routes
app.get("/", (req, res) => {
  res.render("index.html");
});

//setup DNS
request.post(
  domains.url,
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //start server if successful
      app.listen(port, () => {
        console.log(`Webserver listening on port ${port}`);
      });
    } else {
      console.log(error);
    }
  }
);
