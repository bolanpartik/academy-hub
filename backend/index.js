const express = require('express')
const app = express()
const mongoose = require('mongoose')

const { MONGO_URL, PORT } = require('./config')

app.use(express.json())

async function main() {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Successfully connected to database')
        app.listen(PORT, () => {
            console.log(`Sever is up and running on port ${PORT}`)
        })
    } catch (error) {
        console.log('Database is down', error)
    }
}
main()