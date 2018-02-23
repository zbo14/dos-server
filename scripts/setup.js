#!/usr/bin/env node 

const db = require('../lib/db')
const {hashSync} = require('bcrypt')

const saltRounds = 10
const hash = hashSync(process.env.DB_PASSWORD, saltRounds)
const query = `INSERT INTO users(username, password, type) VALUES ('${process.env.DB_USER}', '${hash}', 'admin')`

db.query(query, (err) => {
  if (err) {
    throw err
  }
  process.exit()
})