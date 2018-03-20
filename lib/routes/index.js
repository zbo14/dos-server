'use strict'

/* eslint-env node, es6 */

const admin = require('./admin')
const user = require('./user')

module.exports = (app, passport, config) => {
  app.post('/api/login', user.auth(passport), user.login)
  app.get('/api/logout', user.logout)
  app.get('/admin/login', admin.login.get(config))
  app.post('/admin/login', admin.auth(passport), admin.login.post)
  app.get('/admin/panel', admin.requiresLogin, admin.panel(config))
  app.use((err, req, res, next) => {
    if (err.message && err.message.includes('not found')) return next()
    app.asyncEmit('error', err)
    res.status(500).send(err)
  })
  app.use((req, res) => {
    const payload = {
      url: req.originalUrl,
      error: 'not found'
    }
    if (req.accepts('json')) return res.status(404).json(payload)
    res.status(404).render('404', payload)
  })
}
