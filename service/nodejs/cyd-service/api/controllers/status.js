const logger = require('../helpers/logger');

exports.getStatus = (req, res) => {
  logger.info('status.getStatus');
  const status = {
    "statusCode": 200,
    "salutation": "Hunky dory",
    "version": "1.0"
  };
  res.status(200).json(status).send();
};
