'use strict'

/* eslint-env node, es6 */

const {compare} = require('bcrypt')
const {expect} = require('chai')

exports.deleteUser = (app, user, done) => {
  const {username} = user
  app.asyncOnce(`deletedUser:${username}`, err => {
    expect(err).to.not.be.an('error')
    done()
  })
  app.asyncEmit('deleteUser', username)
}

exports.failQueryUserByName = (app, user, done) => {
  const {username} = user
  app.asyncOnce(`gotUserByName:${username}`, (err, result) => {
    expect(err).to.be.an('error')
    expect(result).to.equal(undefined)
    done()
  })
  app.asyncEmit('getUserByName', username)
}

exports.failQueryUserById = (app, user, done) => {
  const {id} = user
  app.asyncOnce(`gotUserById:${id}`, (err, result) => {
    expect(err).to.be.an('error')
    expect(result).to.equal(undefined)
    done()
  })
  app.asyncEmit('getUserById', id)
}

exports.queryUserByName = (app, user, done) => {
  const {username} = user
  app.asyncOnce(`gotUserByName:${username}`, (err, result) => {
    expect(err).to.not.be.an('error')
    expect(result).to.be.an('object')
    expect(result.id).to.be.a('number')
    user.id = result.id
    expect(result.type).to.equal(user.type)
    expect(result.username).to.equal(username)
    compare(user.password, result.password, (err, result) => {
      expect(err).to.not.be.an('error')
      expect(result).to.equal(true)
      done()
    })
  })
  app.asyncEmit('getUserByName', username)
}

exports.queryUserById = (app, user, done) => {
  const {id} = user
  app.asyncOnce(`gotUserById:${id}`, (err, result) => {
    expect(err).to.not.be.an('error')
    expect(result).to.be.an('object')
    expect(result.id).to.equal(id)
    expect(result.type).to.equal(user.type)
    expect(result.username).to.be.a('string')
    done()
  })
  app.asyncEmit('getUserById', id)
}
