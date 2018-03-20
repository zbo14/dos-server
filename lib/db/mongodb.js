'use strict'

/* eslint-env node, es6 */

const {MongoClient} = require('mongodb')
const checkHealth = require('../events/checkHealth').mongodb
const createUser = require('../events/createUser').mongodb
const createUsers = require('../events/createUsers').mongodb
const deleteUser = require('../events/deleteUser').mongodb
const getUserById = require('../events/getUserById').mongodb
const getUserByName = require('../events/getUserByName').mongodb
const init = require('../events/init')
const start = require('../events/start').mongodb
const stop = require('../events/stop').mongodb

exports.mongodb = (app, {db}) => {
  const url = `mongodb://${db.host}:${db.port}`
  MongoClient.connect(url, (err, client) => {
    if (err) return app.emit('error', err)
    const collection = client.db(db.database).collection('users')
    checkHealth(app, client)
    createUser(app, collection)
    createUsers(app, collection)
    deleteUser(app, collection)
    getUserById(app, collection)
    getUserByName(app, collection)
    init(app)
    start(app, collection)
    stop(app, client)
  })
}
