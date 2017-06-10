'use strict';

exports.getStatus = function(req, res) {
  var status = {
    "statusCode": 42,
    "salutation": "Hunky dory",
    "version": "1.0"
  };
  console.log(new Date(), 'getStatus');
  res.json(status).send();
};
