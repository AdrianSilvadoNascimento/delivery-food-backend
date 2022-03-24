const mongoose = require('mongoose')

const URI_MONGO = process.env.DB

const connectToDB = async() => {
    try {
        await mongoose.connect(URI_MONGO, {
            useUnifiedTopology: true
        })
        console.log('The DB has been conected')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectToDB