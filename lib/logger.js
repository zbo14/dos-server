'use strict'

/* eslint-env node, es6 */

const winston = require('winston')

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
})

logger.stream = {write: msg => logger.info(msg)}

module.exports = logger
