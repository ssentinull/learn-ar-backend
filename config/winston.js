const winston = require('winston');

const { format } = winston;

const options = {
  level: 'debug',
  handleExceptions: true,
  format: format.combine(
    format.colorize(),
    format.simple(),
  ),
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