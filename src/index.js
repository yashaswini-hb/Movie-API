const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const cors = require("cors");
app.use(cors());
const route = require("./routes/index");

app.use(route);

httpServer.listen(4000, () => {
  console.log("listening 4000");
});
