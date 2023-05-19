const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const port = 3000;

// **** USE **** //
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

// Import routes
const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");

// Use routes
server.use("/api/v1/users", userRoutes);
server.use("/api/v1/posts", postRoutes);

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
