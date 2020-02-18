/**
|--------------------------------------------------
| Auth Middleware
|--------------------------------------------------
*/
const jwt    = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  checkUserAuth  : (req, res, next) => {
    var token = req.headers['authorization']
    if (!token){
      return res.status(403).send({ 
        success : false, 
        message : 'No token provided.' 
      })
    }
    
    jwt.verify(token, config.private_key, (err, decoded) => {
      if (err) {
        return res.status(500).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      if (!decoded.is_user) {
        return res.status(403).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      req.decoded = decoded
      next()
    })
  },
  checkAdminAuth : (req, res, next) => {
    var token = req.headers['authorization']
    if (!token){
      return res.status(403).send({ 
        success : false, 
        message : 'No token provided.' 
      })
    }
    
    jwt.verify(token, config.private_key, (err, decoded) => {
      if (err) {
        return res.status(500).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      if (!decoded.is_admin) {
        return res.status(403).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      req.decoded = decoded
      next()
    })
  }
}