'use strict'

/* eslint-env node, es6 */

const admin = require('../app/admin')
const users = require('../app/users')
const monitoring = require('../app/monitoring')
const {requiresAdmin, requiresLogin} = require('../middleware/auth')
const winston = require('winston')

module.exports = (app, passport, db) => {
  app.post('/api/login', passport.authenticate('local'), users.login)
  app.get('/api/logout', users.logout)
  app.get('/api/ping', requiresLogin, users.ping)
  app.get('/admin/login', admin.renderLogin)
  app.post('/admin/login', passport.authenticate('local', {'failureRedirect': '/admin/login'}), admin.login)
  app.get('/admin/panel', requiresAdmin, admin.renderPanel)
  app.get('/health', monitoring(db))

  app.use((err, req, res, next) => {
    if (err.message && err.message.includes('not found')) {
      return next()
    }
    winston.error(err.stack)
    res.status(500).send(err)
  })

  app.use((req, res) => {
    const payload = {
      'url': req.originalUrl,
      'error': 'not found'
    }
    if (req.accepts('json')) {
      return res.status(404).json(payload)
    }
    res.status(404).render('404', payload)
  })
}