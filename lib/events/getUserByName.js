'use strict'

/* eslint-env node, es6 */

/**
 * @event getUserByName
 * @type {string}
 * @fires gotUserByName:${username}
 */

exports.postgresql = (app, pool) => {
  app.asyncOn('getUserByName', username => {
    pool.query(`
      SELECT id, username, password, type FROM users
      WHERE username = '${username}';`,
    (err, result) => {
      if (err) return app.asyncEmit('gotUserByName', err)
      else if (!result.rows.length) {
        err = new Error(`Error could not find user with username: '${username}'`)
        return app.asyncEmit(`gotUserByName:${username}`, err)
      }
      const user = result.rows[0]
      user.id = parseInt(user.id)
      app.asyncEmit(`gotUserByName:${username}`, null, user)
    })
  })
}

exports.mongodb = (app, collection) => {
  app.asyncOn('getUserByName', username => {
    collection.findOne({username}, (err, user) => {
      if (err) return app.asyncEmit(`gotUserByName:${username}`, err)
      user.id = user._id
      delete user._id
      app.asyncEmit(`gotUserByName:${username}`, null, user)
    })
  })
}
