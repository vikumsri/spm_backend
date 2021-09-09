//require log4js
const log4js = require('log4js');

//logger configuration
log4js.configure({
  appenders: { logger: { type: "file", filename: "application.log" } },
  categories: { default: { appenders: ["logger"], level: "info" } }
});

//create logger
const logger = log4js.getLogger();

function log(value) {
  logger.info(value)
}

module.exports = { log }