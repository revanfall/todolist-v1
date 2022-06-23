//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

console.log(date);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const items = [];
const workItems = [];


app.listen(process.env.port || 3000, function() {
  console.log("Server has started");
  for (var i = 0; i < 2; i++) {
    var x = 5;
  }
  console.log(x);
})


app.get("/", function(req, res) {

  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
})

app.post("/", function(req, res) {
  console.log(req.body);
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
})

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  })
})
