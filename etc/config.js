'use strict'

/* eslint-env node, es6 */

const {resolve} = require('path')
const {_} = require('../lib/util')

module.exports = _.merge({
  admins: [],
  app: {
    host: 'localhost',
    port: 9000,
    root: resolve('..')
  },
  db: {
    type: 'postgresql',
    host: 'localhost',
    port: 5432,
    database: 'posthaste',
    user: '',
    password: ''
  },
  redis: {
    host: 'localhost',
    port: 6379
  },
  secret: 'secret'
}, require(`./local/${process.env.NODE_ENV}`))
