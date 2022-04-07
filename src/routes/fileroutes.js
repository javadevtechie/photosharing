var express = require('express');
const mysqlConnection = require("../connection");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
var app = express();
app.set('view engine', 'ejs');


app.post('/register', function (req, res) {
    let query = `INSERT INTO user (name,password,email) VALUES (?, ?,?);`;
    mysqlConnection.query(query, [req.body.name,req.body.password,req.body.email], (err, rows) => {
        if (err) throw err;
        res.json({ message: "Registration has been completed successfully" });
    });
    

});
app.get('/getall', function (req, res) {
    mysqlConnection.query("select * from document", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log("error");
        }
    })
});

app.get('/', function (req, res) {
    res.render('index');
});
app.post("/upload", upload.array("file"), uploadFiles);
function uploadFiles(req, res) {

    let ext = req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length - 1];
    let query = `INSERT INTO document  (path, extension,originalname,user_id) VALUES (?, ?, ?,?);`;
    mysqlConnection.query(query, [req.files[0].path,
        ext, req.files[0].originalname.replace('\\', '/'),1], (err, rows) => {
            if (err) throw err;
            res.json({ message: "File has been uploaded successfully " });
        });
   
}
app.get('/download/:filename/', function (req, res) {

    const filename = req.params.filename;
    console.log(filename);
    //const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
    // res.download(file); // Set disposition and send it.
});
module.exports = app;