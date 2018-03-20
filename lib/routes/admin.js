'use strict'

/* eslint-env node, es6 */

exports.auth = passport => {
  return passport.authenticate('local', {failureRedirect: '/admin/login'})
}

exports.login = {
  get: config => {
    const filePath = `${config.app.root}/public/login.html`
    return (req, res) => res.sendFile(filePath)
  },
  post: (req, res) => {
    if (req.user && req.user.type === 'admin') {
      return res.redirect('/admin/panel')
    }
    res.redirect('/admin/login')
  }
}

exports.panel = config => {
  const filePath = `${config.app.root}/public/admin_panel.html`
  return (req, res) => res.sendFile(filePath)
}

exports.requiresLogin = (req, res, next) => {
  if (req.user && req.user.type === 'admin') return next()
  res.sendStatus(401)
}
