'use strict'

/* eslint-env node, es6 */

/**
 * @event getUserById
 * @type {number}
 * @fires gotUserById:${id}
 */

exports.postgresql = (app, pool) => {
  app.asyncOn('getUserById', id => {
    pool.query(`
      SELECT id, username, type FROM users
      WHERE id = ${id};`,
    (err, result) => {
      if (err) return app.asyncEmit('gotUserById', err)
      else if (!result.rows.length) {
        err = new Error(`Error could not find user with id: ${id}`)
        return app.asyncEmit(`gotUserById:${id}`, err)
      }
      const user = result.rows[0]
      user.id = parseInt(user.id)
      app.asyncEmit(`gotUserById:${id}`, null, user)
    })
  })
}

exports.mongodb = (app, collection) => {
  app.asyncOn('getUserById', _id => {
    collection.findOne({_id}, (err, user) => {
      if (err) return app.asyncEmit(`gotUserById:${_id}`, err)
      user.id = user._id
      delete user._id
      app.asyncEmit(`gotUserById:${_id}`, null, user)
    })
  })
}
