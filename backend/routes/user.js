const { Router } = require('express')
const userRouter = Router()
const { z } = require('zod')
const { User } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_USER_SECRET } = require('../config')
const { userMiddleware } = require('../middleware/user')

const signUpBodySchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: 'Password must be al least 8 characters long' }),
    firstName: z.string().min(3),
    lastName: z.string()
})

const signInBodySchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: 'Password must be al least 8 characters long' }),
})

userRouter.post('/signup', async function (req, res) {
    const { email, password, firstName, lastName } = req.body
    const parseResult = signUpBodySchema.safeParse({
        email,
        password,
        firstName,
        lastName
    })
    if (!parseResult.success) {
        return res.status(400).send({
            message: parseResult.error.issues[0].message
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 5)
        await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })
        res.send({
            message: 'User sign up successfully'
        })
    } catch (error) {
        res.send({
            message: 'User already exists',
        })
    }

})

userRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body

    const parseResult = signInBodySchema.safeParse({
        email,
        password
    })
    if (!parseResult.success) {
        return res.status(400).send({
            message: parseResult.error.issues
        })
    }

    try {
        const user = await User.findOne({
            email
        })
        const matchPassword = await bcrypt.compare(password, user.password)
        if (matchPassword) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_USER_SECRET)
            res.status(200).send({
                message: 'Sign in successful',
                token
            })
        } else {
            res.status(401).send({
                message: 'Incorrect credentials'
            })
        }
    } catch (error) {
        res.status(401).send({
            message: 'Invalid credentials'
        })
    }
})

userRouter.get('/purchases', userMiddleware, async function (req, res) {

})

module.exports = {
    userRouter
}