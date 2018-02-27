'use strict'

/* eslint-env node, es6 */

const bodyParser = require('body-parser')
const config = require('./')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const expressValidator = require('express-validator')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const {ENV, _} = require('../util')
const winston = require('winston')

module.exports = (app, passport, pool) => {
  let log = 'dev'
  if (ENV !== 'development') {
    log = {
      'stream': {
        'write': (msg) => winston.info(msg)
      }
    }
  }

  if (ENV !== 'test') {
    app.use(morgan(log))
  }

  app.engine('handlebars', expressHandlebars())
  app.set('views', path.join(config.root, 'views'))
  app.set('view engine', 'handlebars')

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({'extended': true}))
  app.use(expressValidator())

  app.use(methodOverride(
    (req) => {
      if (_.isNonEmptyObject(req.body) &&
          _.isNonEmptyString(req.body._method)) {
        const method = req.body._method
        delete req.body._method
        return method
      }
    })
  )

  app.use(cookieParser())
  app.use(session({
    'store': new RedisStore({
      'host': config.redis.host,
      'port': config.redis.port
    }),
    'saveUninitialized': false,
    'secret': config.sessionSecret,
    'resave': false,
    'cookie': {
      'maxAge': 1209600000 // 14 * 24 * 60 * 60 * 1000
    }
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/', express.static(path.join(config.root, 'public')))
}
