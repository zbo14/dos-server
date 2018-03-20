'use strict'

/* eslint-env node, es6 */

/**
 * @event stop
 * @fires stopped
 */

exports.postgresql = (app, pool) => {
  app.asyncOn('stop', () => pool.end(() => app.asyncEmit('stopped')))
}

exports.mongodb = (app, client) => () => {
  app.asyncOn('stop', () => client.close(() => app.asyncEmit('stopped')))
}
