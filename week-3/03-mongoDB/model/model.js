const mongoose = require('mongoose')

const User = mongoose.model('users', {
    username: {
        type: String,
        required: true,
        unique:true,
    },
    password: String,
    purchased_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'courses',
        required: true
    }]
})
const Admin = mongoose.model('admins', {
    username: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
})
const Course = mongoose.model('courses', {
   title: String, 
   description: String, 
   imageLink: String,
   price: Number, 
})


module.exports = {User,Admin,Course};