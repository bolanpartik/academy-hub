const express = require('express')
const app = express()
const mongoose = require('mongoose')

const { MONGO_URL, PORT } = require('./config')
const { adminRouter } = require('./routes/admin')
const { userRouter } = require('./routes/user')
const { courseRouter } = require('./routes/course')

app.use(express.json())
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)

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