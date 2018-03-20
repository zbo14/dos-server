'use strict'

/* eslint-env node, es6 */

/**
 * @event init
 * @type {User[]}
 * @fires initComplete
 */

module.exports = app => {
  app.asyncOn('init', admins => {
    app.asyncOnce('started', err => {
      if (err) return app.asyncEmit('initComplete', err)
      app.asyncOnce('createdUsers', err => app.asyncEmit('initComplete', err))
      app.asyncEmit('createUsers', admins)
    })
    app.asyncEmit('start')
  })
}
