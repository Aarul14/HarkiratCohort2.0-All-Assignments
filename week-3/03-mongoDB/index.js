const express = require('express')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://aarul:%23Aarul123@cluster0.utzw5.mongodb.net/UdemyDB').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
  
app.use("/admin", adminRouter)
app.use('/user', userRouter)

const PORT = 3000;

app.listen(3000, ()=>{
    console.log("Server running on port", PORT)
})