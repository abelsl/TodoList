const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set ('view engine', 'ejs');
app.use(express.static("primary"));

var items = ["buy food", "cook food", "eat food"];
var workList =[];  

app.get("/", (req, res) =>{
  let day = date.getDate();
  res.render('list',{listTitle : day, newlistItems : items});
});

app.post("/", ( req, res) => {
  var item = req.body.inp;
 if(req.body.list === "Work" ){
  workList.push(item);
  res.redirect("/work");
 }else{
  items.push(item);
  res.redirect("/");
 }  
});

app.get("/work", ( req, res) => {
  res.render("list", {listTitle: "Work List", newlistItems : workList});
});

app.post("/work", ( req, res ) => {
  let item = req.body.newlistItems;
  workList.push(item);
  res.redirect("/work");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, (  ) => {
  console.log("server listining to port 3000");
});