'use strict'

/* eslint-env node, es6 */

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressValidator = require('express-validator')
const logger = require('./logger')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const {_} = require('./util')

module.exports = (app, passport, config) => {
  app.use(morgan('combined', {stream: logger.stream}))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(expressValidator())
  app.use(methodOverride(req => {
    if (_.isNonEmptyObject(req.body) && _.isNonEmptyString(req.body._method)) {
      const method = req.body._method
      delete req.body._method
      return method
    }
  }))
  app.use(cookieParser())
  app.use(session({
    store: new RedisStore(config.redis),
    saveUninitialized: false,
    secret: config.secret,
    resave: false,
    cookie: {maxAge: 1209600000}
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use('/', express.static(path.join(config.app.root, 'public')))
}
