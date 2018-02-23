'use strict'

/* eslint-env node, es6 */

exports.requiresAdmin = (req, res, next) => {
  if (req.user && req.user.type === 'admin') {
    return next()
  }
  res.sendStatus(401)
}

exports.requiresLogin = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.sendStatus(401)
}
