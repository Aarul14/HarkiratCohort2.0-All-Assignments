const express = require("express");
const { User, Admin, Course } = require("../model/model");
const router = express.Router();

/*POST /users/signup
  Description: Creates a new user account.
  Input: { username: 'user', password: 'pass' }
  Output: { message: 'User created successfully' } 
*/

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
});

/* GET /users/courses
  Description: Lists all the courses.
  Input: Headers: { 'username': 'username', 'password': 'password' }
  Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
*/

router.get("/courses", async (req, res) => {

    await Course.find({}).then((result)=>res.json({courses: result}))
//   const { username, password } = req.header;

//   try {
//     const valid = await User.findOne({ username, password });
//     if (valid) {
//       res.status(200).json({
//         courses: valid,
//       });
//     } else {
//       res.json({ messgae: "sorry! you have not purchased any course yet" });
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: "server error",
//     });
//   }
});

/*POST /users/courses/:courseId
  Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
  Input: Headers: { 'username': 'username', 'password': 'password' }
  Output: { message: 'Course purchased successfully' }
*/
router.post("/courses/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const { username } = req.headers;

  try {
    const result = await User.updateOne(
      { username },
      { $push: { purchased_courses: courseId } }
    );
    res.json({result:'succesfully added the course'}); // Send the result back to the client
  } catch (error) {
    res.status(500).send(error); // Error handling
  }
});

/*
- GET /users/purchasedCourses
Description: Lists all the courses purchased by the user.
Input: Headers: { 'username': 'username', 'password': 'password' }
Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
*/
router.get("/courses/purchasedCourses", async (req, res) => {
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchased_courses);
    try{
        //courses table me dhund ki kaun kaun se courses iss user ne liye hai 
            const courses = await Course.find({
            _id:{
                "$in":  user.purchased_courses
            }
        })
        res.status(200).json({message: 'Request succesfull', result: courses})
    }catch(err){
        res.json({message: err.message})
    }
   
});

module.exports = router;
