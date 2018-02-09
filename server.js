// Express
const express = require('express');
const app = express();


const path = require('path');
app.use(express.static(path.resolve('dist')));

const parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// CORS
const cors = require('cors');
app.use(cors());

const morgan = require("morgan");
app.use(morgan('dev'));

//Model

const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exam');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;
const { Schema } = mongoose;


// Schema for user

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  }
  }, {
    timestamps: true
  });
userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
const User = mongoose.model('User', userSchema);



//Controller for User

const userController = {

  create: (request, response) => {
    console.log('here')
    userParams = {name: request.body.name}
    console.log(userParams)
    User.create(userParams)
      .then(user => {
        console.log("user created",user)
        response.json(user)
      })
      .catch(error => {
        response.status(422).json(
          Object.keys(error.errors).map(key=>error.errors[key].message)
        )
      });
  }
}


// Routes
app
.post('/users', userController.create)
.all('/*', function (req, res) {
  res.sendFile(path.resolve('./dist/index.html'))
})
//Server
const port = 5000;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));

