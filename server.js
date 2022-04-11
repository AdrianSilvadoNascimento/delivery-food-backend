const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config({ path: 'variables.env' })

const connectDB = require('./config/db')
const userRoutes = require('./routes/user')

const app = express()

const bodyParserJSON = bodyParser.json()
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true })

connectDB()
app.use(cors())
app.use(express.json())
app.use(bodyParserJSON)
app.use(bodyParserURLEncoded)

app.use('/user', userRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log('the server has been initializated on port:', process.env.PORT || 3000)
})