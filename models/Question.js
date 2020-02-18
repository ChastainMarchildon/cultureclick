const mongoose = require('mongoose');

// define a schema for the listing model
// this and all other models inherit from mongoose.Schema

const questionSchema = new mongoose.Schema({
  surveyID:{
    type: String,
    required: 'Must be associated with a survey'
  },
  question:{
    type: String,
    required: 'Must have at least one question.'
  },
  questionID:{
    type: String,
    required: 'Must have a unique question ID'
  },
});

module.exports = mongoose.model('Question', questionSchema);