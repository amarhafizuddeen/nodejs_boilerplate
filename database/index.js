/**
|--------------------------------------------------
| Database Connection
|--------------------------------------------------
*/
const Sequelize = require('sequelize')
const {db} = require('../config')

var sequelize = new Sequelize(db.database, db.user, db.password, db);

module.exports = sequelize