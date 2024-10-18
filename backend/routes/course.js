const { Router } = require('express')
const courseRouter = Router()
const { Course } = require('../db')

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

courseRouter.post('/purchase', async function (req, res) {

})

module.exports = {
    courseRouter
}