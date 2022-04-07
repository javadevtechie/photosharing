
const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'file_management'
});
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("connected ")
    }
    else {
        console.log("Not Connected ")
    }

});

module.exports=mysqlConnection;