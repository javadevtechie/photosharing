var express = require('express');
var router = express.Router();
const mysqlConnection = require("../connection");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get('/getall', function (req, res) {
    mysqlConnection.query("select * from document", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log("error");
        }
    })
});

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});
router.post("/upload", upload.array("file"), uploadFiles);
function uploadFiles(req, res) {

    console.log(req.files[0]);
    let ext = req.files[0].originalname.split(".")[req.files[0].originalname.split(".").length - 1];
    let query = `INSERT INTO document  (path, extension,originaname,updatedby) VALUES (?, ?, ?, ?);`;
    mysqlConnection.query(query, [req.files[0].path,
        ext,req.files[0].originalname,'jeremy'], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = " + rows.insertId);
    });

    res.json({ message: "Fiel has been uploaded successfully " });
}

module.exports = router;