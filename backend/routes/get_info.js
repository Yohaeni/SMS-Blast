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

        var access_token = response.body.split('"');

        // connection.query("INSERT INTO SMS_Client (accesstoken, mobilenumber) VALUES ('" + body.access_token + "', '" + body.subscriber_number +"')",
        // function (error, result, fileds) {
        //     if (error) {
        //         res.send('err : ' + error)
        //     }
        //     else {
        //         console.log(body)
        //         res.send('success' + body)
        //     }
        // })
        console.log(access_token[0]);
        console.log(access_token[1]);
        console.log(access_token[2]);
        console.log(access_token[3]);
        console.log(access_token[4]);
        console.log(access_token[5]);
        console.log(access_token[6]);
        console.log(access_token[7]);
        console.log(access_token[8]);
        res.send(response);
    });
    
});



module.exports = router;