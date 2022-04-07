var express = require('express');
const mysqlConnection = require("../connection");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
var app = express();
app.set('view engine', 'ejs');
const utf8 = require('utf8');

app.post('/register', function (req, res) {
    let query = `INSERT INTO user (name,password,email) VALUES (?, ?,?);`;
    mysqlConnection.query(query, [req.body.lname + req.body.fname, req.body.password, req.body.email], (err, rows) => {
        if (err) throw err;
        res.json({ message: "Registration has been completed successfully" });
    });


});
app.post('/login', function (req, res) {

    let query = `select *  from user where email=? and password=?;`;
    mysqlConnection.query(query, [utf8.encode(req.body.email), req.body.password], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            res.json({ message: "Logged-In successfully" });
        }
        else {
            res.status(301).json({message:"Username/Password incorrect"}).end() ;
        }
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
        ext, req.files[0].originalname.replace('\\', '/'), 1], (err, rows) => {
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