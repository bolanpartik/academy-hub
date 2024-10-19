const { Router } = require('express')
const courseRouter = Router()
const { Course, Purchase } = require('../db')
const { userMiddleware } = require('../middleware/user')

// Show all the existing courses
courseRouter.get('/show', async function (req, res) {
    try {
        const courses = await Course.find({})
        console.log(courses)
        res.status(200).send({
            courses
        })
    } catch (error) {
        res.status(500).send({
            message: 'Error while fetching courses',
            error
        })
    }
})

// Purchase course for a user
courseRouter.post('/purchase', userMiddleware, async function (req, res) {
    const userId = req.userId
    const { isPaid, courseId } = req.body
    if (!isPaid) {
        return res.status(403).send({
            message: 'Payment not done'
        })
    }
    try {
        await Purchase.create({
            userId,
            courseId
        })
        res.status(201).send({
            message: 'Course purchase successfully'
        })
    } catch (error) {
        res.status(409).send({
            message: 'Course not purchased',
            error
        })
    }
})

module.exports = {
    courseRouter
}