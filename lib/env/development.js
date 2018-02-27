'use strict'

/* eslint-env node, es6 */

module.exports = {
  'db': {
    'user': '',
    'password': '',
    'database': '',
    'host': 'localhost',
    'port': 5432,
    'max': 50,
    'idleTimeoutMillis': 30000
  },
  'redis': {
    'host': 'localhost',
    'port': 6379
  },
  'sessionSecret': 'posthaste-development'
}
