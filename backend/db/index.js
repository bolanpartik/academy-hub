const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String,
    firstName:String,
    lastName:String
})

const AdminSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String,
    firstName:String,
    lastName:String

})

const CourseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    adminId:ObjectId
})

const PurchaseSchema = new Schema({
    userId:ObjectId,
    courseId:ObjectId
})

const User = mongoose.model('Users', UserSchema)
const Admin = mongoose.model('Admins', AdminSchema)
const Course = mongoose.model('Courses', CourseSchema)
const Purchase = mongoose.model('Purchases',PurchaseSchema)
module.exports = {
    User,
    Admin,
    Course,
    Purchase
}