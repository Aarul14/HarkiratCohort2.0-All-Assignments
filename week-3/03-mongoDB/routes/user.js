const express = require("express");
const { User, Admin, Course } = require("../model/model");
const { userMiddleware } = require("../middlewares/user");
const { adminMiddleware } = require("../middlewares/admin");

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

router.get("/courses", userMiddleware, async (req, res) => {
  await Course.find({})
    .then((result) => res.json({ courses: result }))
    .catch((err) => res.json({ err: err.message }));
});

/*POST /users/courses/:courseId
  Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
  Input: Headers: { 'username': 'username', 'password': 'password' }
  Output: { message: 'Course purchased successfully' }
*/
router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const { courseId } = req.params;
  const { username } = req.headers;

  try {
    //search kar user ke purchased courses me whether is this purchased or not already
    const user = await User.findOne({ username });
    if (user) {
      const alreadyPurchased = user.purchased_courses.includes(courseId);
      if (alreadyPurchased)
        res.json({ message: "this course is already bought by you" });
      else {
        const result = await User.updateOne(
          { username },
          { $push: { purchased_courses: courseId } }
        );
        res.json({ result: "succesfully added the course" }); // Send the result back to the client
      }
    }
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
router.get("/courses/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });

  console.log(user.purchased_courses);
  try {
    //courses table me dhund ki kaun kaun se courses iss user ne liye hai
    const courses = await Course.find({
      _id: {
        $in: user.purchased_courses,
      },
    });
    res.status(200).json({ message: "Request succesfull", result: courses });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/details", userMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.headers.username });
    if (user) res.json({ user });
    else res.json({ message: "not found" });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
