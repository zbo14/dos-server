'use strict'

/* eslint-env node, es6 */

/**
 * @event start
 * @fires started
 */

exports.postgresql = (app, pool) => {
  app.asyncOn('start', () => {
    pool.query(
      `DROP TABLE IF EXISTS users CASCADE;
      CREATE TABLE "users" (
        "id" bigserial PRIMARY KEY,
        "username" varchar(255) UNIQUE,
        "password" varchar(100),
        "type" varchar(50)
      );`,
      err => app.asyncEmit('started', err)
    )
  })
}

exports.mongodb = (app, collection) => {
  app.asyncOn('start', () => {
    collection.deleteMany({}, err => {
      if (err) return app.asyncEmit('started', err)
      collection.createIndex('username', {unique: true}, err => app.asyncEmit('started', err))
    })
  })
}
