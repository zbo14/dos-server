#!/bin/bash

read -p "Enter database name: " DB_NAME
read -p "Enter username: " DB_USER
read -p "Enter password: " -s DB_PASSWORD
export DB_USER
export DB_PASSWORD

psql -f ./scripts/setup.sql
node ./scripts/setup.js

