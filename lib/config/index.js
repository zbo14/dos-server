'use strict'

/* eslint-env node, es6 */

const path = require('path')
const {ENV} = require('../util')
const config = require(`../env/${ENV}`)

config.root = path.join(__dirname, '..', '..')

module.exports = config
