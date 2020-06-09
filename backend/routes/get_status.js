var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
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

    connection.query("SELECT COUNT(CASE WHEN status='success' THEN 1 END) AS 'success', COUNT(CASE WHEN status='fail' THEN 1 END) AS 'fail' FROM `sms_message` ", function (err, result) {
        res.json(result);
    });
});

module.exports = router;