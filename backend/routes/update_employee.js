var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var mysql = require('mysql');

    //Create mysql connection
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: '',
        database: 'sms_blast'
    });

    //Connect to mysql
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    console.log(req);

    var subscriber_id = req.body.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;

    connection.query("UPDATE company_employee SET email = '" + email + "', first_name = '" + first_name + "', last_name = '" + last_name + "'  WHERE id = " + subscriber_id, function (err, result) {
        if (err) throw new Error(err);
        res.send(result);
    });
});

module.exports = router;