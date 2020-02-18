/**
|--------------------------------------------------
| Deep API Starter
|--------------------------------------------------
*/
const express    = require('express')
const bodyParser = require('body-parser')
const config     = require('./config');
const app        = express()
const routes     = require('./routes')
const cors       = require('cors')

// configure middleware
app.set('port', process.env.port || config.port) // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // parse form data client
app.use(cors())

app.use(`/api`, routes)

// set the app to listen on the port
app.listen(config.port, () => {
  console.log(`Server running on port: ${config.port}`)
})