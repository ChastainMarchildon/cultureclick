const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a schema for the listing model
// this and all other models inherit from mongoose.Schema

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Please enter Listing title',
  },
  city: {
    type: String,
    required: 'Please enter City',
  },
  description:{
    type: String,
    required: 'Please enter a brief description'
  },
  surveyID:{
    type: String,
    required: 'Must have a unique survey ID'
  },
  organization:{
    type: String,
    required: 'Must have an organization'
  },
  questions:[
    {type: Schema.Types.ObjectId, ref: 'Question'}
  ]
});

module.exports = mongoose.model('Survey', surveySchema);
