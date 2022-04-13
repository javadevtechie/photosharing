var express = require('express');
const mysqlConnection = require("../connection");
const path = require("path");
const multer = require("multer");
var fs = require("fs");
var dir = "fileUpload";   

if (!fs.existsSync(dir)) {  
  fs.mkdirSync(dir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
var app = express();
app.set('view engine', 'ejs');
const utf8 = require('utf8');

app.use('/fileUpload', express.static('fileUpload'));


app.post('/register', function (req, res) {
    let query = `INSERT INTO user (name,password,email) VALUES (?, ?,?);`;
    mysqlConnection.query(query, [req.body.lname + req.body.fname, req.body.password, req.body.remail], (err, rows) => {
        if (err) throw err;
        res.json({ message: "Registration has been completed successfully" });
    });
});

app.get('/getUserName/:id', function (req, res) {
    const { id } = req.params;
    let query = `select name from user where id=?;`;
    mysqlConnection.query(query, [id], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            res.json({userid:rows[0].name });
        }
        else {
            res.status(404).json({message:"username  not found"}).end() ;
        }
    });
});

app.post('/login', function (req, res) {

    let query = `select *  from user where email=? and password=?;`;
    mysqlConnection.query(query, [utf8.encode(req.body.email), req.body.password], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            res.status(200).json({ message: "Logged-In successfully",userid:rows[0].id ,username:rows[0].name});
        }
        else {
            res.status(301).json({message:"Username/Password incorrect"}).end() ;
        }
    });
});
app.get('/getall', function (req, res) {
    mysqlConnection.query("select * from document", (err, rows, fields) => {
        if (!err) {
            res.json(rows).end();
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
        ext, req.files[0].originalname.replace('\\', '/'), req.body.userid], (err, rows) => {
            if (err) throw err;
            res.json({ message: "File has been uploaded successfully " });
        });

}
app.get('/download', function (req, res) {
  
    console.log(req.query.filename); 
    
    res.download(req.query.filename, function(err){
        if(err) {
          res.sendStatus(404);
        }
      }
    );

});




module.exports = app;