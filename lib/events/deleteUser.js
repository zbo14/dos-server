'use strict'

/* eslint-env node, es6 */

/**
 * @event deleteUser
 * @type {string}
 * @fires deletedUser:${username}
 */

exports.postgresql = (app, pool) => {
  app.asyncOn('deleteUser', username => {
    pool.query(
      `DELETE FROM users WHERE username = '${username}'`,
      err => app.asyncEmit(`deletedUser:${username}`, err)
    )
  })
}

exports.mongodb = (app, collection) => {
  app.asyncOn('deleteUser', username => {
    collection.deleteOne(
      {username},
      err => app.asyncEmit(`deletedUser:${username}`, err)
    )
  })
}
