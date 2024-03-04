const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const users = require('./routes/users'); // Importing user routes
const creations = require('./routes/creations'); // Importing creations routes
const config = require('./config/database')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: 'blablabla',
  resave: true,
  saveUninitialized: true
}));
          
cloudinary.config({ 
  cloud_name: 'dcgpkcifz', 
  api_key: '263191747331738', 
  api_secret: 'rBJag3yR1c2O0yXopmwHjdKZvjs' 
});

// Connect to database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected',() => {
  console.log('Connected to database ' + config.database)
})

// On Error
mongoose.connection.on('error',(err) => {
  console.log('Database error: ' + err)
})

// CORS Middleware
app.use(cors());


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// Allows the use of JSON in requests
app.use(express.json());

// Add user routes
app.use(users);
// Add creations routes
app.use(creations);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
