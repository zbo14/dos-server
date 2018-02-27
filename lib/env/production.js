'use strict'

/* eslint-env node, es6 */

require('dotenv').config()

module.exports = {
  'db': {
    'user': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'max': process.env.DB_MAX_CONNECTIONS,
    'idleTimeoutMillis': process.env.DB_IDLE_TIMEOUT
  },
  'redis': {
    'host': process.env.REDIS_HOST,
    'port': process.env.REDIS_PORT
  },
  'sessionSecret': ''
}
