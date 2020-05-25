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
    var pMessage = req.body.pmessage;
    var firstNames = [];
    var lastNames = [];
    var addresses = [];
    var pMessages = [];
    var clientCorrelator = "123456";
    var message = req.body.message;
    var access_token = "";

    // put numbers into addresses array
    if (address.length > 11) {
        addresses = address.split(",");
        firstNames = firstName.split(",");
        lastNames = lastName.split(",");
        pMessages = pMessage.split(",");
    }

    // If there is only one mobile number
    if (addresses.length < 1) {
        // If there is only one number with 11 digits.
        if (address.length == 11) {
            address = address.substr(1, 10);
        }

        if (firstName != null && lastName != null) {
            sendingMessage = "Hello " + firstName + " " + lastName + "!\n" + message;
        } else {
            sendingMessage = message;
        }

        //Get User Info
        var sql =
            "SELECT accesstoken FROM SMS_Client WHERE mobilenumber = '" +
            address +
            "'";

        // Start Time
        var startTime = new Date();
        console.log(startTime.getTime());

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
                                message: sendingMessage,
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

        var endTime = new Date();
        console.log(endTime.getFullYear() + "-" + endTime.getMonth() + "-" + endTime.getDate() + " " + endTime.getHours() + ":" + endTime.getMinutes() + ":" + endTime.getSeconds());
        totalTime = endTime.getTime() - startTime.getTime();
        console.log("Time consumed : " + totalTime + "ms");
    }
    // If there are more than one number
    else {
        var i = 0;
        var startTime = new Date();
        console.log(startTime.getTime());
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
                    var pMsg = "";
                    var fullName = "";

                    fName = firstNames[i];
                    lName = lastNames[i];
                    pMsg = pMessages[i];
                    sendingMessage = "Hello " + fName + " " + lName + "!\n" + message + "\n" + pMsg;
                    fullName = fName + " " + lName;


                    console.log(sendingMessage);

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
                                    message: sendingMessage,
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
                    var times = new Date();
                    var timestamp = times.getFullYear() + "-" + (times.getMonth() + 1) + "-" + times.getDate() + " " + times.getHours() + ":" + times.getMinutes() + ":"
                    times.getSeconds() + "." + times.getMilliseconds();
                    var smsQuery = "INSERT INTO sms_message (recipients,message,timestamp) VALUES ('" + fullName + "', '" + sendingMessage + "', " + timestamp + "')";

                    connection.query(smsQuery, function (err, response) {
                        if (err) throw err;
                        console.log(response);
                    })

                    i++;
                }
            });
        }
        var endTime = new Date();
        var totalTime = endTime.getTime() - startTime.getTime();
        console.log(endTime.getFullYear() + "-" + (endTime.getMonth() + 1) + "-" + endTime.getDate() + " " + endTime.getHours() + ":" + endTime.getMinutes() + ":" + endTime.getSeconds() + "." + endTime.getMilliseconds());
        console.log("Time consumed : " + totalTime + "ms");
        res.redirect(301, 'http://test.davidandgolyat.com/sms-blast');
    }
});

module.exports = router;