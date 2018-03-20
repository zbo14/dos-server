'use strict'

/* eslint-env node, es6 */

const pg = require('pg')
const checkHealth = require('../events/checkHealth').postgresql
const createUser = require('../events/createUser').postgresql
const createUsers = require('../events/createUsers').postgresql
const deleteUser = require('../events/deleteUser').postgresql
const getUserById = require('../events/getUserById').postgresql
const getUserByName = require('../events/getUserByName').postgresql
const init = require('../events/init')
const start = require('../events/start').postgresql
const stop = require('../events/stop').postgresql

module.exports = (app, {db}) => {
  const pool = new pg.Pool(db)
  checkHealth(app, pool)
  createUser(app, pool)
  createUsers(app, pool)
  deleteUser(app, pool)
  getUserById(app, pool)
  getUserByName(app, pool)
  init(app)
  start(app, pool)
  stop(app, pool)
}
