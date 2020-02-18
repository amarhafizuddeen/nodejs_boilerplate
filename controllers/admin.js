/**
|--------------------------------------------------
| Admin Controller
|--------------------------------------------------
*/
const {Admin} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')
const Op = require('sequelize').Op
const saltRounds = 8
const {
  missingField
} = require('../helpers')

module.exports = {
  create: (req, res) => {
    const first_name = req.body.first_name ? req.body.first_name : false
    const last_name = req.body.last_name ? req.body.last_name : false
    const email = req.body.email ? req.body.email : false
    const password = req.body.password ? bcrypt.hashSync(req.body.password, saltRounds) : false

    if (!first_name) return missingField('first_name', res)
    if (!last_name) return missingField('last_name', res)
    if (!email) return missingField('email', res)
    if (!password) return missingField('password', res)

    const value = {
      first_name,
      last_name,
      email,
      password
    }

    Admin.create(value)
    .then(() => {
      return res.status(200).send({
        success: true,
        message: `Successfully created admin`
      })
    })
    .catch(e => {
      if (e.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).send({
          success: false,
          message: `Email already exist`
        })
      }

      console.log(e)

      return res.status(500).send({
        success: false,
        message: `Failed to create admin. Internal server error`
      })
    })
  },
  login: (req, res) => {
    const {
      email,
      password
    } = req.body

    // Get the hashed password from the database and compare it with the password sent for login
    const options = {
      where: {
        email: email
      }
    }

    Admin.findOne(options)
      .then(admin => {
        if (admin) {
          // Compare hashed password with the given password
          bcrypt.compare(password, admin.password, (err, valid) => {
            if (valid) {
              // Generate token
              const payload = {
                id: admin.id,
                first_name: admin.first_name,
                last_name: admin.last_name,
                email: admin.email,
                is_admin: true
              }
              const token = jwt.sign(payload, config.private_key, {
                expiresIn: config.token_expires_in
              })

              // Craft response
              admin.password = null
              const response = {
                success: true,
                message: 'Login successful',
                token: token,
                type: "admin",
                user: admin,
                expiresIn: config.token_expires_in
              }

              return res.status(200).send(response)
            } else {
              // Given password does not match
              const response = {
                success: false,
                message: 'Invalid credentials'
              }

              return res.status(403).send(response)
            }
          })
        } else {
          return res.status(404).send({
            success: false,
            message: `Invalid credentials`
          })
        }
      })
  },
  aboutme: (req, res) => {
    const {id} = req.decoded

    Admin.findOne({
      where: {id},
      attributes: {
        exclude: ['password']
      }
    })
    .then(admin => {
      return res.status(200).send({
        success: true,
        message: `Successfully fetched admin data`,
        data: admin
      })
    })
    .catch(e => {
      console.log(e)

      return res.status(500).send({
        success: false,
        message: `Failed to fetch admin data. Internal server error`
      })
    })
  }
}