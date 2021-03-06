const express = require('express');
const app = express();
const mongoose = require('mongoose');
//body parser
const bodyParser = require('body-parser');
const passport = require('passport')
const Users = require('./routes/api/Users');
const Posts = require('./routes/api/Posts');
const Profile = require('./routes/api/Profile');
//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;
//connect to mongodb
mongoose.connect(db)
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize())

//passport
require('./config/passport')(passport);
//User routes
app.use('/api/Users', Users);
app.use('/api/Profile', Profile);
app.use('/api/Posts', Posts);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
