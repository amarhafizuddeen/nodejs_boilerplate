/**
|--------------------------------------------------
| Helpers
|--------------------------------------------------
*/

var helpers = {}

helpers.missingField = (field, res) => {
  return res.status(400).send({
    success: false,
    message: `Missing required field ${field}`
  })
}

module.exports = helpers