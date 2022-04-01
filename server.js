
const express = require("express");
const bodyParser = require("body-parser");
const filerouter= require("./routes/fileroutes");
const mysqlConnection= require("./connection");

var app = express();
app.use(bodyParser.json());
app.use("/file",filerouter);

app.listen(3000);

