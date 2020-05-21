var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
    // Load mysql module
    var mysql = require("mysql");

    // Create mysql connection
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        port: "3306",
        password: "Awesomecompany1234!",
        database: "sms_blast",
    });

    //Connect to mysql
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    var request = require("request");
    var shortcode = "8380";
    var address = req.body.address;
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var firstNames = [];
    var lastNames = [];
    var addresses = [];
    var clientCorrelator = "123456";
    var message = req.body.message;
    var access_token = "";

    // put numbers into addresses array
    if (address.length > 11) {
        addresses = address.split(",");
        firstNames = firstName.split(",");
        lastNames = lastName.split(",");
    }

    // If there is only one mobile number
    if (addresses.length < 1) {
        // If there is only one number with 11 digits.
        if (address.length == 11) {
            address = address.substr(1, 10);
        }

        message = "Hello " + firstName + " " + lastName + "!\n" + message;
        //Get User Info
        var sql =
            "SELECT accesstoken FROM SMS_Client WHERE mobilenumber = '" +
            address +
            "'";

        connection.query(sql, function (err, response) {
            if (err) throw err;
            console.log(response);

            if (response.length == 0) {
                res.send({
                    message: "Oops! Address doesn't exists.",
                });
            } else {
                access_token = response[0].accesstoken;
                var options = {
                    method: "POST",
                    url: "https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/" +
                        shortcode +
                        "/requests",
                    qs: {
                        access_token: access_token,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        outboundSMSMessageRequest: {
                            clientCorrelator: clientCorrelator,
                            senderAddress: shortcode,
                            outboundSMSTextMessage: {
                                message: message,
                            },
                            address: address,
                        },
                    },
                    json: true,
                };

                request(options, function (error, response, body) {
                    if (error) throw new Error(error);

                    console.log(body);
                    res.send(body);
                });
            }
        });
    }
    // If there are more than one number
    else {
        var i = 0;
        for (const number of addresses) {
            //var number = addresses[i];

            // If there is number with 11 digits.
            if (number.length == 11) {
                number = number.substr(1, 10);
            }
            console.log(number);
            //Get User Info
            var sql =
                "SELECT accesstoken FROM SMS_Client WHERE mobilenumber = '" +
                number +
                "'";

            connection.query(sql, function (err, response) {
                if (err) throw err;
                console.log(response);

                if (response.length == 0) {
                    res.send({
                        message: "Oops! Address doesn't exists.",
                    });
                } else {
                    var fName = "";
                    var lName = "";

                    fName = firstNames[i];
                    lName = lastNames[i];
                    console.log(fName + lName);
                    message = "Hello " + fName + " " + lName + "!\n" + message
                    access_token = response[0].accesstoken;
                    var options = {
                        method: "POST",
                        url: "https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/" +
                            shortcode +
                            "/requests",
                        qs: {
                            access_token: access_token,
                        },
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: {
                            outboundSMSMessageRequest: {
                                clientCorrelator: clientCorrelator,
                                senderAddress: shortcode,
                                outboundSMSTextMessage: {
                                    message: message,
                                },
                                address: number,
                            },
                        },
                        json: true,
                    };

                    // request(options,
                    //     function (error, response, body) {
                    //         if (error) throw new Error(error);

                    //         console.log(body);
                    //     });

                    i++;
                }
            });
        }
        res.send("Success");
    }
});

module.exports = router;