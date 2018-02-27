'use strict'

/* eslint-env node, es6 */

const ENV = process.env.NODE_ENV || 'development'
const _ = require('lodash')

_.mixin({
  'isNonEmptyObject': (obj) => _.isPlainObject(obj) && !_.isEmpty(obj),
  'isNonEmptyString': (str) => _.isString(str) && !_.isEmpty(str)
})

module.exports = {
  'ENV': ENV,
  '_': _
}
