const envs = require("./envs.js");
const { initialItems, createItem, editItem } = require("./controllers/items.js");

const items = initialItems;
const express = require("express");
var cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true, // header Access-Control-Allow-Credentials
  })
);

const port = envs.PORT || 5000;

if (process.env.NODE_ENV === "production" || true) {
  app.use(express.static("build"));
}

app.post("/api/v1/items", createItem); // add item
app.get("/api/v1/items", items); // get all items
app.patch("/api/v1/items/:item/:quantity", editItem); // edit quantity

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("server runing at port ", port);
});
