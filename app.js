const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todolist");
const Task = require("./DB/Task");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

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
    res.render("list", { listTitle: day, newlistItems: items });
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
  const itemId = req.body.checkbox; // Assuming the ID is passed as the value of the "checkbox" field in the request body

  try {
    await Task.findByIdAndRemove(itemId); // Replace "item" with "Item" and use "itemId" as the argument
    console.log("Successfully deleted checked item");
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.get("/:name", async (req, res) => {
//   const name = req.params.name;
//   res.send(`Hello, ${name}!`);
// });

// app.post('/b', (req, res) => {
//   const inputData = req.body.inputData;
//   console.log('Submitted data:', inputData); // Display the submitted data on the server console

//   // Additional code to process the submitted data as needed

//   res.redirect('/inp'); // Redirect back to the index page
// });

app.post('/submit/:inputData', (req, res) => {
  const inputData = req.params.inputData;
  console.log('Submitted data:', inputData);

  // Perform any necessary processing with the submitted data

  res.send('Data received successfully');
});

app.listen(3000, () => {
  console.log("Server is running from port 3000");
});
