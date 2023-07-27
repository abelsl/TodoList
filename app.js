const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser : true});

const itemSchema = new mongoose.Schema({
  name : String
}); 

const Item = new  mongoose.model("item", itemSchema);

const item1 = new Item({
  name : "Buy Food"
});
const item2 = new Item({
  name : "make food"
});
const item3 = new Item({
  name : "eat food"
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
  name : String,
  items : [itemSchema]
});

const List = new mongoose.model("lists", listSchema);

app.get("/", function(req, res) {

  Item.find()
  .then( ( foundItem ) => {
    if( foundItem.length === 0 ){

      Item.insertMany(defaultItems)
      .then( ( ) =>{
        console.log("Data is Saved Successfully to DB");
      })
      .catch( (err) => {
        console.log(err);
      });
      res.redirect("/")
    } else {
    res.render("list", {listTitle: "Today", newListItems: foundItem});
    }
  })
  .catch( ( err ) => {
     console.log(err);
  } );

  

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name : itemName
  });

  if( listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name : listName})
    .then( ( foundList) => {
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    })
    .catch( ( err ) => {
      console.log( err );
    });
  }

  
});

app.post("/delete", function (req, res){
  const crossedId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today"){
    Item.findByIdAndRemove(crossedId)
    .then( ( ) => {
      console.log( "Item deleted successfully" );
    })
    .catch( ( err ) => {
      console.log( err );
    });
    res.redirect("/");

  } else {
    List.findOneAndUpdate({name : listName}, {$pull : {items : {_id : crossedId}}})
    .then( ( ) => {
      console.log("Deleted From Custom Successfully!");
      res.redirect("/" + listName);
    })
    .catch( ( err ) => {
      console.log( err );
    });
  }


});



app.get("/:header", function( req, res ) {
  const title = _.capitalize( req.params.header );
  const pure = title;

  List.findOne({name : title})
  .then( ( foundList ) =>{
     if( foundList !== null){
      res.render("list", { listTitle : foundList.name, newListItems : foundList.items});
     }else { 
      const list = new List ( {
        name : title,
        items : defaultItems
      });
      list.save();
      res.redirect("/"+ pure);

     }
  })
  .catch ( ( err ) => {
    console.log( err );
  });

});

app.get("/about", function( req, res ){
  res.render("about");
});

app.listen(300, function() {
  console.log("Server started on port 3000");
});
