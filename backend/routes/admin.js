const { Router } = require('express')
const adminRouter = Router()
const { z } = require('zod')
const { Admin } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_ADMIN_SECRET } = require('../config')

const signUpBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(3),
    lastName: z.string().min(3)
})
const signInBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

adminRouter.post('/signup', async function (req, res) {
    const { email, password, firstName, lastName } = req.body
    const parshedBody = signUpBodySchema.safeParse({
        email,
        password,
        firstName,
        lastName
    })
    if (!parshedBody.success) {
        return res.status(401).send({
            message: parshedBody.error.issues
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 11)
        await Admin.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })
        res.status(200).send({
            message: 'Admin sign up done'
        })
    } catch (error) {

        res.status(500).send({
            message: 'Error while adding admin to db',
            error
        })
    }
})

adminRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body
    const parshedBody = signInBodySchema.safeParse({
        email,
        password
    })
    if (!parshedBody.success) {
        return res.status(400).send({
            message: parshedBody.error.issues
        })
    }
    try {
        const admin = await Admin.findOne({
            email
        })

        const matchPassword = await bcrypt.compare(password, admin.password)

        if (matchPassword) {
            const token = jwt.sign({
                adminId: admin._id
            }, JWT_ADMIN_SECRET)
            res.status(200).send({
                message: 'Admin sign in done',
                token
            })
        }

    } catch (error) {

        res.status(401).send({
            message: 'Invalid credentials'
        })
    }
})

adminRouter.post('/course', async function (req, res) {

})

adminRouter.put('/course', async function (req, res) {

})

adminRouter.get('/courses', async function (req, res) {

})

module.exports = {
    adminRouter
}
