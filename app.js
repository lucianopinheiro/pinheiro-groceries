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

app.get("/api", function (req, res) {
  res.send("Hello World");
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("server runung at port ", port);
});
