'use strict'

/* eslint-env node, es6 */

const {isNonEmptyObject} = require('../util')._

exports.login = (req, res) => {
  if (isNonEmptyObject(req.user) &&
      req.user.type === 'admin') {
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
