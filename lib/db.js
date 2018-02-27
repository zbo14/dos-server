'use strict'

/* eslint-env node, es6 */

const pg = require('pg')
const config = require('./config')
const winston = require('winston')

const pool = new pg.Pool(config.db)

pool.on('error', (err) => {
  setImmediate(() => winston.error(err.message, err.stack))
})

module.exports = pool
