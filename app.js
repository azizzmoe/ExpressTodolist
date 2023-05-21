const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Task = require("./DB/Task");

mongoose.connect("mongodb://127.0.0.1:27017/todolist");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let inputData = "";

app.get("/", async (req, res) => {
  const today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  try {
    let items = await Task.find({});
    res.render("list", { listTitle: day, newlistItems: items, inputData: "" });
  } catch (error) {
    console.error("Error while getting data:", error);
    res.status(500).send("Error while getting data");
  }
});

app.post("/", async (req, res) => {
  let taskName = req.body.newItem;

  const task = new Task({
    name: taskName,
  });

  try {
    await task.save();
    console.log("Item saved successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error while getting data:", error);
    res.status(500).send("Error while getting data");
  }
});

app.post("/delete", async (req, res) => {
  const itemId = req.body.checkbox;

  try {
    await Task.findByIdAndRemove(itemId);
    console.log("Successfully deleted checked item");
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/:inputData", (req, res) => {
  inputData = req.params.inputData;
  console.log("Input Data:", inputData);

  res.send(`The chosen list : ${inputData}`);
  // res.redirect("/inputData")
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
