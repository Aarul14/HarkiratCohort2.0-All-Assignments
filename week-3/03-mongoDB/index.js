const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./model'); 

const app = express();
app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/yourDatabaseName').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

app.post('/admin/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await User.findOne({ username, role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new User({ username, password, role: 'admin' });
    await admin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
