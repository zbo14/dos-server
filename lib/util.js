'use strict'

/* eslint-env node, es6 */

const _ = require('lodash')

_.mixin({
  isNonEmptyObject: obj => _.isPlainObject(obj) && !_.isEmpty(obj),
  isNonEmptyString: str => _.isString(str) && !_.isEmpty(str)
})

const asynchronize = app => {
  app.asyncEmit = (eventName, ...args) => {
    setImmediate(() => app.emit(eventName, ...args))
  }
  app.asyncOn = (eventName, cb) => {
    app.on(eventName, (err, ...results) => setImmediate(cb, err, ...results))
  }
  app.asyncOnce = (eventName, cb) => {
    app.once(eventName, (err, ...results) => setImmediate(cb, err, ...results))
  }
}

module.exports = {_, asynchronize}
