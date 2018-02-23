'use strict'

/* eslint-env node, es6 */

exports.login = (req, res) => {
  if (req.user && req.user.type === 'admin') {
    return res.redirect('/admin/panel')
  }
  res.redirect('/admin/login')
}

exports.renderLogin = (req, res) => {
  res.render('login')
}

exports.renderPanel = (req, res) => {
  res.render('admin_panel')
}
