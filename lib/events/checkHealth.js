'use strict'

/* eslint-env node, es6 */

/**
 * @event checkHealth
 */

exports.postgresql = (app, pool) => {
  app.asyncOn('checkHealth', () => {
    pool.query('SELECT 1', err => app.asyncEmit('checkedHealth', err))
  })
}

exports.mongodb = (app, client) => {
  app.asyncOn('checkHealth', () => {
    if (client.isConnected(process.env.DB_NAME)) return app.asyncEmit('checkedHealth')
    app.asyncEmit('checkedHealth', new Error('MongoClient is not connected'))
  })
}
