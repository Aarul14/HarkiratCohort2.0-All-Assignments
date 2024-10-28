require("dotenv").config();
const express = require("express");
const { Admin,User, Course } = require('../model/model');
const {adminMiddleware} = require('../middlewares/admin')
const zod = require('zod')
const jwt = require('jsonwebtoken')
const secretKey = "harkiratbhaiOP";


//* This handles every endpoint hit after the "/admin" (eg /admin/signup)
const router = express.Router();

router.post("/signup" ,async (req, res) => {
  const {username, password} = req.body;
  console.log(username, password)
  try {
    const existingAdmin = await Admin.findOne({ username: username, password:password });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    Admin.create({username, password})
    .then((val)=>{
      res.status(201).json({ message: "Admin created successfully" });      
    })
    .catch((err)=>{
      console.log(err.message)
      res.json({
        message:"unable to create Admin"
      })
    })
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/signin', async(req,res)=>{
    //username password lega , token sign krk vapis dega
    const username = req.headers.username
    console.log(secretKey);
    const user  = await Admin.findOne({username})
    if(user){
        const token = jwt.sign(username, secretKey)
        res.json({token})
      }
    else{
        res.status(401).json({message: "invalid credentials"})
    } 
})


/* - POST /admin/courses
  Description: Creates a new course.
  Input: Headers: { 'username': 'username', 'password': 'password' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
  Output: { message: 'Course created successfully', courseId: "new course id generated by mongoDB itself" }
  */


router.post("/courses", async (req, res) => {
  const {title, description, imageLink, price} = req.body;
   
  //if exist leave
  // const existingCourse =  
  // if(exisits) {}
  const course = Course.create({
    title,
    description,
    imageLink,
    price,
  }).then((course)=> console.log(course))
  
  res.status(201).json({message: "Course created succesfully",
    course_id: course._id
  })
});
/*
GET /admin/courses
  Description: Returns all the courses.
  Input: Headers: { 'username': 'username', 'password': 'password' }
  Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
*/ 
router.get("/courses", (req, res) => {
  Course.find({}).then((items)=> res.json({Courses: items}))
});


module.exports = router