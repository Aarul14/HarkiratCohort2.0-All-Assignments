const express = require("express");
const jwt = require("jsonwebtoken");
const jwtpassword = "123456";
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aarul:%23Aarul123@cluster0.utzw5.mongodb.net/user_app", { 
    
});

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});


const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "hakrirat@gmail.com",
    password: "123",
    name: "Aarul Mishra",
  },
  {
    username: "john.doe@gmail.com",
    password: "abc123",
    name: "John Doe",
  },
  {
    username: "jane.smith@yahoo.com",
    password: "password1",
    name: "Jane Smith",
  },
  {
    username: "michael.brown@outlook.com",
    password: "mike2024",
    name: "Michael Brown",
  },
  {
    username: "emily.jones@icloud.com",
    password: "emilypass",
    name: "Emily Jones",
  },
  {
    username: "david.wilson@live.com",
    password: "david123",
    name: "David Wilson",
  },
];

function userExist(username, password) {
  //complete the logic return true/false when user exist in ALL_SUER db
  const index = ALL_USERS.findIndex(
    (user) => user.username === username && user.password === password
  );
  if (index !== -1) {
    return true;
  } else {
    return false;
  }
}
// * Steps
// * Username and Password are verified through custom funciton (userExist())
// * After verification sign token with jwtpassword
// * Return the token in JSON format
app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!userExist(username, password)) {
    return res.status(404).json({ msg: "Unauthorized user" });
  }
  var token = jwt.sign({ username: username }, jwtpassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  //* In Frontend User when makes fetch request, and inside header.authroisation reads the token stored in the localstorage(localstorage.read(token))
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtpassword);
    const usernam = decoded.username;
    console.log(usernam);
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid Token",
    });
  }

  return res.json({
    users: ALL_USERS.filter((val) => {
      val.username === username ? true : false;
    }),
  });
});

app.post('/signup', async (req,res)=>{
    const name = req.body.name;
    const username = req.body.username
    const password = req.body.password

    const existingUser = await User.findOne({email: username})
    if(existingUser) return res.status(400).send("User already exist")
    const user = new User({
        name: name,
        email: username,
        password: password,
    })
    
    user.save()
      .then(() => {
        console.log('Data saved succesfully')
        res.json({
            "msg":"saved succesfully"
        })
      })
      .catch(err => console.error('Error saving user:', err))
})

app.listen(3000, () => {
  console.log(`App listening at port 3000`);
});
