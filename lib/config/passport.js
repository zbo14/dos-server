'use strict'

/* eslint-env node, es6 */

const bcrypt = require('bcrypt')
const {Strategy} = require('passport-local')
const winston = require('winston')

module.exports = (passport, db) => {
  passport.use(new Strategy(
    (username, password, cb) => {
      db.query('SELECT id, username, password, type FROM users WHERE username=$1', [username], (err, result) => {
        setImmediate(() => {
          if (err) {
            winston.error('Error when selecting user on login', err)
            return cb(err)
          } else if (!result.rows.length) {
            const err = new Error(`Error could not find user with username: ${username}`)
            winston.error(err)
            return cb(err)
          }
          const first = result.rows[0]
          bcrypt.compare(password, first.password, (err, res) => {
            if (err) {
              winston.error(err)
              return cb(err)
            } else if (!res) {
              return cb(null, false)
            }
            cb(null, {
              'id': first.id,
              'username': first.username,
              'type': first.type
            })
          })
        })
      })
    })
  )

  passport.serializeUser((user, cb) => {
    setImmediate(() => cb(null, user.id))
  })

  passport.deserializeUser((id, cb) => {
    id = parseInt(id, 10)
    db.query('SELECT id, username, type FROM users WHERE id=$1', [id], (err, results) => {
      setImmediate(() => {
        if (err) {
          winston.error('Error when selecting user on session deserialize', err)
          return cb(err)
        }
        const first = results.rows[0]
        cb(null, first)
      })
    })
  })
}
