/**
|--------------------------------------------------
| Models Index
|--------------------------------------------------
*/
const sequelize = require('../database')

sequelize.sync()

var _models = {}

_models.Admin = sequelize.import("admin")

/**
|--------------------------------------------------
| Associations
|--------------------------------------------------
*/
// _models.AdminNotification.associate(_models)

// Models
module.exports = _models
