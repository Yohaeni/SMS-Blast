var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {

    // Load mysql module
    var mysql = require('mysql');

    // Create mysql connection
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

    //Get User Info
    var sql = "SELECT accesstoken FROM SMS_Client WHERE mobilenumber = '" + req.body.address + "'";

    connection.query(sql, function (err, response) {
        if (err) throw err;
        console.log(response);


        if (response.length == 0) {
            res.send({
                "message": "Oops! Address doesn't exists."
            });
        } else {
            var request = require("request");
            var shortcode = '8380';
            var access_token = response[0].accesstoken;
            console.log(access_token);
            var address = req.body.address;
            var clientCorrelator = '123456';
            var message = req.body.message;
            var options = {
                method: 'POST',
                url: 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/' + shortcode + '/requests',
                qs: {
                    'access_token': access_token
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    'outboundSMSMessageRequest': {
                        'clientCorrelator': clientCorrelator,
                        'senderAddress': shortcode,
                        'outboundSMSTextMessage': {
                            'message': message
                        },
                        'address': address
                    }
                },
                json: true
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(body);
                res.redirect(req.get('referer'));
                // res.send(body);
            });
        }
    });
});



module.exports = router;