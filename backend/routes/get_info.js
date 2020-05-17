var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var request = require("request");
    var appId = 'zodGIE6Rb8tBginKBEcR6gtEaoozIyoy';
    var appSecret = 'bbdfb979db0094746acf9008a70095fafccfed0401eabf5fce5fa173ce2d7fc6';
    var code = req.body.code;
    var options = { method: 'POST',   
    url: 'https://developer.globelabs.com.ph/oauth/access_token?app_id=' + appId + '&app_secret=' + appSecret + '&code=' + code,
    };

    //Load mysql module
    var mysql = require('mysql');

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

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var bodyString = response.body.split('"');
        var access_token = bodyString[3];
        var subscriber_number = bodyString[7];

        //var sql = "INSERT INTO SMS_Client (accesstoken, mobilenumber, subscriber_id) VALUES ('" + access_token + "', '" + subscriber_number + "', '1')";

        // connection.query(sql, function (err, result) {
        //     if (err) throw err;
        //     console.log(result);
        // });

        connection.query("SELECT COUNT(*) as count FROM SMS_Client WHERE mobilenumber = '" + subscriber_number + "'", function (err, result) {
            console.log(util.inspect(result));
            if (result[0].count == 0) {

                var sql = "INSERT INTO SMS_Client (accesstoken, mobilenumber, subscriber_id) VALUES ('" + access_token + "', '" + subscriber_number + "', '1')";

                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                });

            }
        });

        console.log("Access_Token : " + access_token);
        console.log("Mobile number : " + subscriber_number);
        res.send(response);
    });
    
});



module.exports = router;
