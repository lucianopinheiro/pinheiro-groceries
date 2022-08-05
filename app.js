const { initialItems, createItem, editItem } = require("./routes/items.js");

const items = initialItems;
const express = require("express");
const app = express();

// const path = require("path");
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production" || true) {
  app.use(express.static("build"));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "build", "index.html"));
  // });
}

app.post("/api/v1/items", createItem); // add item
app.get("/api/v1/items", items); // get all items
app.patch("/api/v1/items/:item/:quantity", editItem); // edit quantity

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("server runing at port ", port);
});
