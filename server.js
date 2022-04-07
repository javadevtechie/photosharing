
const express = require("express");
const bodyParser = require("body-parser");
const filerouter= require("./src/routes/fileroutes");
const mysqlConnection= require("./src/connection");

var app = express();
app.use(bodyParser.json());
app.use("/filemanagement",filerouter);
app.use(express.static(__dirname ));
app.listen(3000);

