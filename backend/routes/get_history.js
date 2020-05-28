var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var mysql = require('mysql');
    res.setHeader("Access-Control-Allow-Origin", "*");

    //Create mysql connection
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: 'Awesomecompany1234!',
        database: 'sms_blast'
    });

    //Connect to mysql
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    connection.query("SELECT message,recipients,timestamp FROM `sms_message` ORDER BY timestamp DESC LIMIT 10", function (err, result) {
        res.json(result);
    });
});

module.exports = router;