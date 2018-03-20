'use strict'

/* eslint-env node, es6 */

const config = require('./etc/config')
const db = require(`./lib/db/${config.db.type}`)
const express = require('express')
const logger = require('./lib/logger')
const passport = require('passport')
const {_, asynchronize} = require('./lib/util')

const app = express()
asynchronize(app)
db(app, config)

app.asyncOn('error', (err, cb) => {
  logger.error(err.message, err.stack)
  if (_.isFunction(cb)) setImmediate(cb, err)
})

require('./lib/passport')(app, passport)
require('./lib/express')(app, passport, config)
require('./lib/routes')(app, passport, config)

app.asyncOnce('initComplete', err => {
  if (err) return app.asyncEmit('error', err)
  const server = app.listen(config.app.port, config.app.host, () => {
    logger.log(`Server is listening on '${config.app.host}:${config.app.port}'`)
  })
  app.asyncOnce('stopped', () => {
    server.emit('close')
    logger.log('Stopped app')
  })
  server.once('close', () => {
    app.asyncEmit('stop')
    logger.log('Closed server')
  })
})

app.asyncEmit('init', config.admins)
