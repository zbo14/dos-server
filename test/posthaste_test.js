'use strict'

/* eslint-env node, es6 */

const {describe, it} = require('mocha')
const {expect} = require('chai')
const fixtures = require('./fixtures')
const config = require('../etc/config')
const db = require(`../lib/db/${config.db.type}`)
const express = require('express')
const passport = require('passport')
const {asynchronize} = require('../lib/util')

const admin = {
  username: 'admin',
  password: 'passwerd',
  type: 'admin'
}

const user1 = {
  username: 'user-1',
  password: 'password-1',
  type: 'user'
}

const user2 = {
  username: 'user-2',
  password: 'password-2',
  type: 'user'
}

const app = express()
asynchronize(app)
db(app, config)

require('../lib/passport')(app, passport)
require('../lib/express')(app, passport, config)
require('../lib/routes')(app, passport, config)

describe('posthaste', () => {
  it('starts app', done => {
    app.asyncOnce('started', err => {
      expect(err).to.not.be.an('error')
      done()
    })
    app.asyncEmit('start')
  })
  it('creates admin', done => {
    const {username} = admin
    app.asyncOnce(`createdUser:${username}`, err => {
      expect(err).to.not.be.an('error')
      done()
    })
    app.asyncEmit('createUser', admin)
  })
  it('creates users', done => {
    app.asyncOnce('createdUsers', err => {
      expect(err).to.not.be.an('error')
      done()
    })
    app.asyncEmit('createUsers', [user1, user2])
  })
  it('queries admin by name', done => fixtures.queryUserByName(app, admin, done))
  it('queries user1 by name', done => fixtures.queryUserByName(app, user1, done))
  it('queries user2 by name', done => fixtures.queryUserByName(app, user2, done))
  it('queries admin by id', done => fixtures.queryUserById(app, admin, done))
  it('queries user1 by id', done => fixtures.queryUserById(app, user1, done))
  it('queries user2 by id', done => fixtures.queryUserById(app, user2, done))
  it('deletes user2', done => fixtures.deleteUser(app, user2, done))
  it('fails to query user2 by name', done => fixtures.failQueryUserByName(app, user2, done))
  it('fails to query user2 by id', done => fixtures.failQueryUserById(app, user2, done))
  it('checks health', done => {
    app.asyncOnce('checkedHealth', err => {
      expect(err).to.not.be.an('error')
      done()
    })
    app.asyncEmit('checkHealth')
  })
})
