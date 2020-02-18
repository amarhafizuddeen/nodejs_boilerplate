/**
|--------------------------------------------------
| Admin's Model
|--------------------------------------------------
*/
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('admin', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING, 
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'admins'
  })

  return Admin
}