var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var request = require("request");
    var shortcode = '8380';
    var access_token = req.body.address;
    var address = req.body.address;
    var clientCorrelator = '123456';
    var message = req.body.message;
    var options = { method: 'POST',
    url: 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/' + shortcode + '/requests',
    qs: { 'access_token': access_token },
    headers: 
    { 'Content-Type': 'application/json' },
    body: 
    { 'outboundSMSMessageRequest': 
        { 'clientCorrelator': clientCorrelator,
        'senderAddress': shortcode,
        'outboundSMSTextMessage': { 'message': message },
        'address': address } },
    json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
    res.send('SMS Page');
});



module.exports = router;