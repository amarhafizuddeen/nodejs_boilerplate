/**
|--------------------------------------------------
| Configuration File
|--------------------------------------------------
*/
require('dotenv').config()
const fs = require('fs')

const host     = process.env.DB_HOST || 'localhost'
const database = process.env.DB_DATABASE || 'deep'
const username = process.env.DB_USERNAME || 'root'
const password = process.env.DB_PASSWORD || null
const dialect  = process.env.DB_DIALECT || 'mysql'

module.exports = {
  app_url : process.env.APP_URL || 'localhost',
  port    : process.env.PORT || 3000,

  /**
  |--------------------------------------------------
  | Database
  |--------------------------------------------------
  */
  db : {
    host     : host,
    database : database,
    user     : username,
    password : password,
    dialect  : dialect,
    logging  : false,
    port     : 3306,
    pool     : {
      max     : 5,
      min     : 0,
      acquire : 30000,
      idle    : 10000
    }
  },

  /**
  |--------------------------------------------------
  | JSONWebToken 
  |--------------------------------------------------
  */
  private_key      : fs.readFileSync(__dirname + '/deep.key'),
  token_expires_in : '24h',

  /**
  |--------------------------------------------------
  | Sequelize
  |--------------------------------------------------
  */
  development : {
    username : username,
    password : password,
    database : database,
    host     : host,
    dialect  : dialect
  },
  test        : {
    username : username,
    password : password,
    database : database,
    host     : host,
    dialect  : dialect
  },
  production  : {
    username : username,
    password : password,
    database : database,
    host     : host,
    dialect  : dialect
  }
};
