'use strict'

/* eslint-env node, es6 */

const {hash} = require('bcrypt')
const {_} = require('../util')

/**
 * @event createUsers
 * @type {User[]}
 * @fires createdUsers
 */

const saltRounds = 10

exports.postgresql = (app, pool) => {
  app.asyncOn('createUsers', users => {
    const values = []
    _.each(users, ({username, password, type}) => {
      hash(password, saltRounds, (err, passwordHash) => {
        if (err) return app.asyncEmit('createdUsers', err)
        values.push(`('${username}', '${passwordHash}', '${type}')`)
        if (values.length === users.length) {
          pool.query(
            `INSERT INTO users (username, password, type)
            VALUES ${_.join(values, ',')}
            ON CONFLICT (username) DO NOTHING;`,
            err => app.asyncEmit(`createdUsers`, err)
          )
        }
      })
    })
  })
}

exports.mongodb = (app, collection) => {
  app.asyncOn('createUsers', users => {
    const writes = []
    _.each(users, user => {
      hash(user.password, saltRounds, (err, passwordHash) => {
        if (err) return app.asyncEmit('createdUsers', err)
        writes.push({insertOne: {document: user}})
        if (writes.length === users.length) {
          collection.bulkWrite(writes, err => app.asyncEmit('createdUsers', err))
        }
      })
    })
  })
}
