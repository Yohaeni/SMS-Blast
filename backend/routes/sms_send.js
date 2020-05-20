var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var request = require("request");
    var shortcode = '8380';
    var access_token = req.body.access_token;
    var address = req.body.address;
    var addresses = [];
    var clientCorrelator = '123456';
    var message = req.body.message;

    if (address.length > 11) {
        addresses = address.split(',');
    }
    // If there is only one mobile number
    if (addresses.length < 1) {
        // If there is only one number with 11 digits.
        if (address.length == 11) {
            address = address.substr(1, 10);
        }
    }

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
        res.send(body);
    });
}
// If there are more than one number
else {
    for (var i = 0; i < addresses.length; i++) {
        var number = addresses[i];
        // If there is only one number with 11 digits.
        if (number.length == 11) {
            number = number.substr(1, 10);
        }
    }

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
                'address': number
            }
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        res.send(body);
    });
}
}

});



module.exports = router;