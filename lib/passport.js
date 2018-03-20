'use strict'

/* eslint-env node, es6 */

const {compare} = require('bcrypt')
const {Strategy} = require('passport-local')

module.exports = (app, passport) => {
  passport.use(new Strategy(
    (username, password, cb) => {
      app.asyncOnce(`gotUserByName:${username}`, (err, user) => {
        if (err) return app.asyncEmit('error', err, cb)
        compare(password, user.password, (err, res) => {
          if (err) return app.asyncEmit('error', err, cb)
          else if (!res) {
            err = new Error(`Error invalid password`)
            return app.asyncEmit('error', err, cb)
          }
          setImmediate(cb, null, {
            id: user.id,
            username: user.username,
            type: user.type
          })
        })
      })
      app.asyncEmit('getUserByName', username)
    })
  )

  passport.serializeUser((user, cb) => setImmediate(cb, null, user.id))

  passport.deserializeUser((id, cb) => {
    id = parseInt(id)
    app.asyncOnce(`gotUserById:${id}`, (err, user) => {
      if (err) return app.asyncEmit('error', err, cb)
      setImmediate(cb, null, user)
    })
    app.asyncEmit('getUserById', id)
  })
}
