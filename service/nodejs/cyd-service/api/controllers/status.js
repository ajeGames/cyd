'use strict';

exports.getStatus = function(req, res) {
  var status = {
    "statusCode": 42,
    "salutation": "Hunky dory",
    "version": "1.0"
  };
  console.log('getStatus called at', new Date());
  res.json(status);
};
