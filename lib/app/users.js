'use strict'

/* eslint-env node, es6 */

exports.login = (req, res) => {
  res.json(req.user)
}

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err)
    }
    req.logout()
    res.sendStatus(200)
  })
}

exports.ping = (req, res) => {
  res.sendStatus(200)
}

