const winston = require('winston');

const options = {
  level: 'info',
  handleExceptions: true,
  json: true,
  colorize: true,
};

const logger = new winston.createLogger({
  transports: new winston.transports.Console(options),
  exitOnError: false,
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
}

module.exports = logger;