const mongoose = require('mongoose')

const User = mongoose.model('User', {
    role: String, 
    username: String,
    password: String,
})
const Course = mongoose.model('Course', {
   title: String, 
   description: String, 
   price: Number, 
   imageLink: String,
})


module.exports = {User,Course};