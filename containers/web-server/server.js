const express = require("express");
const app = express();
const port = 3000;
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

app.listen(port, () => {
  console.log(`Webserver listening on port ${port}`);
});
