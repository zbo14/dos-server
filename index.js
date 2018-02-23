'use strict'

/* eslint-env node, es6 */

require('dotenv').config()
const db = require('./lib/db')
const express = require('express')
const passport = require('passport')
const winston = require('winston')

const port = process.env.PORT || 9000
const app = express()

require('./lib/config/passport')(passport, db)
require('./lib/config/express')(app, passport, db)
require('./lib/config/routes')(app, passport, db)

const server = app.listen(port, () => {
  if (app.get('env') !== 'test') {
    winston.log(`App listening on port: ${port}`)
  }
})

server.on('close', () => {
  winston.log('Closed server')
  db.end(() => winston.log('Shutdown connection pool'))
})
