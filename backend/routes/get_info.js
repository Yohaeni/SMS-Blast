var express = require('express');
var router = express.Router();

//Load mysql module
var mysql = require('mysql');

//Create mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'Awesomecompany1234!',
    database: 'sms_blast'
})

//Connect to mysql
connection.connect()

router.post('/', function(req, res, next) {
    var request = require("request");
    var appId = 'zodGIE6Rb8tBginKBEcR6gtEaoozIyoy';
    var appSecret = 'bbdfb979db0094746acf9008a70095fafccfed0401eabf5fce5fa173ce2d7fc6';
    var code = req.body.code;
    var options = { method: 'POST',   
    url: 'https://developer.globelabs.com.ph/oauth/access_token?app_id=' + appId + '&app_secret=' + appSecret + '&code=' + code,
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var bodyString = response.body.split('"');
        access_token = bodyString[3];
        subscriber_number = bodyString[7];
        
        res.send(response);
    });
    console.log("Access_Token : " + access_token);
    console.log("Mobile number : " + subscriber_number);
    // connection.query("INSERT INTO SMS_Client (accesstoken, mobilenumber, subscriber_id) VALUES ('" + access_token + "', '" + subscriber_number +" 1')",
    //     function (error, result, fileds) {
    //         if (error) {
    //             res.send('err : ' + error)
    //         }
    //         else {
    //             console.log(body)
    //             res.send('success' + body)
    //         }
    // });
});



module.exports = router;