var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
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

    connection.query("SELECT company_employee.id as id, company_employee.first_name as first_name, company_employee.last_name as last_name, sms_client.mobilenumber as mobile_number FROM company_employee JOIN sms_client ON company_employee.id = sms_client.subscriber_id", function (err, result) {
        res.send(result);
    });
});

module.exports = router;