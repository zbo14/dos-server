'use strict'

/* eslint-env node, es6 */

exports.auth = passport => passport.authenticate('local')

exports.login = (req, res) => res.json(req.user)

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err)
    req.logout()
    res.sendStatus(200)
  })
}

exports.requiresLogin = (req, res, next) => {
  if (req.user) return next()
  res.sendStatus(401)
}
