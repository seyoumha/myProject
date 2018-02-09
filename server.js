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
mongoose.connect('mongodb://localhost/poll');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

//Question

const questionSchema = new Schema({
  user_question: {
    type: String,
    trim: true,
    required: [true, 'Question is required'],
    minlength: [10, 'Question length must be greater than 10 characters']
  },
  description: {
    type: String,
    trim: true,
  },
  user_name: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true
});


questionSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
const Question = mongoose.model('Question', questionSchema);

//user

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

//Answer

const answerSchema = new Schema({
  user_answer: {
    type:String,
    trim: true,
    required: [true, 'Answer is required'],
    minlength: [5, 'Answer length must be greater than 5 characters']
  },
  detail: {
    type: String,
    trim: true,
  },
  user_name: {
    type: String,
    trim: true,
    required: true
  },
  question_id: {
    type: String,
    trim: true,
    required: true
  },
  vote: {
    type: Number,
    trim: true,
  }
}, {
  timestamps: true
});


answerSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
const Answer = mongoose.model('Answer', answerSchema);

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

//controller for Questions

const questionController = {

  create: (request, response) => {
    questionParams = {user_question: request.body.user_question, description: request.body.description, user_name: request.body.user_answer}
    console.log(questionParams)
    Question.create(questionParams)
      .then(question => {
        response.json(question)
      })
      .catch(error => { console.log(error)

      });
  },
  index: (request, response) => {
    Question.find({}).sort({createdAt: -1})
      .then(questions => response.json(questions))
      .catch(error => console.log(error));
  }
}
//controller for Answers
const answerController = {

  create: (request, response) => {
    console.log('here')
    ansParams = {user_answer: request.body.user_answer, detail: request.body.detail, user_name: request.body.user_name, question_id: request.body.question_id, vote: request.body.vote}
    console.log(ansParams)
    Answer.create(ansParams)
      .then(ans => {
        response.json(ans)
      })
      .catch(error => { console.log(error)

      });
  },
  index: (request, response) => {
    Answer.find({}).sort({vote: -1})
      .then(ans => response.json(ans))
      .catch(error => console.log(error));
  },

  update: (request, response) => {
    console.log('body', request.body_id)
    console.log('params', request.params.id)
    Answer.findById(request.params.id,(err, answer)=>{
      console.log(answer)
      if(err){
        response.status(500).send(err)
      }else{
        answer.vote +=1
        answer.save((err, ans)=>{
          if(err){
            response.status(500).send(err)
          }
          response.json(ans)
        })
      }
    })
  }

}


// Routes
app
.post('/users', userController.create)
.post('/questions', questionController.create)
.get('/questions', questionController.index)
.post('/answers', answerController.create)
.get('/answers', answerController.index)
.put('/answers/:id', answerController.update)
.all('/*', function (req, res) {
  res.sendFile(path.resolve('./dist/index.html'))
})
//Server
const port = 5000;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));

