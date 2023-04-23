const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/todolist');
const Task = require("./DB/Task");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


async function init() {
  // const arr = [{ name: 'Do Home Work' }, { name: 'Clean Set-Up' }];
  // Task.insertMany(arr);
  const items = await Task.find({})
  return items
}

app.get("/", (req, res) => {
  const today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  init().then((fountItems) => {
    
    res.render("list", { listTitle: day, newlistItems: fountItems });
  })

});

app.post("/", (req, res) => {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workList.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

// app.get("/work", (req, res) => {
//   res.render("list", { listTitle: "Work List", newlistItems: workList });
// });

app.listen(3000, () => {
  console.log("Server is running from port 3000");
});
