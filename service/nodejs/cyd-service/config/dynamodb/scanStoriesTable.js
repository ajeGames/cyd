const admin = require('../../api/persistence/admin-db');
const logger = require('../../api/helpers/logger');
const { docClient } = admin.initAWSConnection();

const scanTables = tablesToScan => {
  tablesToScan.forEach(tableName => {
    let params = {
      TableName: tableName
    };
    docClient.scan(params, (err, data) => {
      if (err) {
        logger.error("Unable to scan Stories table.", err);
      } else {
        logger.info("Scan succeeded.", data.Items.length, "items found.");
        data.Items.forEach(item => {
          logger.info(item);
        });
      }
    });
  })
};

scanTables(["Stories", "Chapters"]);
