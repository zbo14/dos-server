'use strict'

/* eslint-env node, es6 */

const {hash} = require('bcrypt')

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} password
 * @property {string} type
 */

/**
 * @event createUser
 * @type {User}
 * @fires createdUser:${username}
 */

const saltRounds = 10

exports.postgresql = (app, pool) => {
  app.asyncOn('createUser', ({username, password, type}) => {
    hash(password, saltRounds, (err, passwordHash) => {
      if (err) return app.asyncEmit('createdUser', err)
      pool.query(
        `INSERT INTO users(username, password, type)
        VALUES ('${username}', '${passwordHash}', '${type}')
        ON CONFLICT (username) DO NOTHING`,
        err => app.asyncEmit(`createdUser:${username}`, err)
      )
    })
  })
}

exports.mongodb = (app, collection) => {
  app.asyncOn('createUser', (username, password, type) => {
    hash(password, saltRounds, (err, passwordHash) => {
      if (err) return app.asyncEmit('createdUser', err)
      collection.insertOne({username, password, type}, err => {
        app.asyncEmit(`createdUser:${username}`, err)
      })
    })
  })
}
