const Survey = require('../models/Survey');
const User = require('../models/User');
const Question = require('../models/Question');
const url = require('url');
var mongoose = require('mongoose');

exports.homePage = (req, res) => {
  res.render('index', { title: 'Home', user: req.user });
};

exports.getSurveys = (req, res) => {
  Survey.find((err, surveys) => {
    if (err) {
      res.render('error');
    } else {
      res.render('surveys', {
        title: 'Your Surveys',
        surveys,
        user: req.user,
      });
    }
  });
};

exports.admin = async (req, res) => {
  // use listing model to query db for listing data
  const surveys = await Survey.find({userID: req.user.id}).sort({ title: 'asc' });

  res.render('admin', {
    title: 'Admin',
    surveys,
    user: req.user,
  });
};



exports.addSurvey = (req, res) => {
  res.render('addSurvey', {
    title: 'Create a New Survey',
    user: req.user,
  });
};

exports.createSurvey = async (req, res) => {
  try {
    var id = mongoose.Types.ObjectId();
    id.toString();
    const survey = new Survey({
                                "title":req.body.title,
                                "city":req.body.city,
                                "description":req.body.description,
                                "surveyID": id
                              });
    await survey.save();
    //Creates questions after survey is created
    for(i=0; i< req.body.name.length; i++){
      var questionID = mongoose.Types.ObjectId();
      questionID.toString();
      const question = new Question({
                                      "question":req.body.name,
                                      "surveyID": id,
                                      "questionID":questionID         
                                    });
      await question.save();
    }
    

    res.redirect('/surveys');
  } catch (err) {
    console.log(err);
  }
};

exports.deleteSurvey = (req, res) => {
  Survey.findByIdAndRemove(
    { _id: req.params.id },
    async (err, surveyJustDeleted) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/admin');
      }
    },
  );
};

exports.editSurvey = (req, res) => {
  // use Listing model to find selected document
  Survey.findById({ _id: req.params.id }, (err, survey) => {
    if (err) {
      console.log(err);
    } else {
      var lookupID = req.params.id
      lookupID.toString();
      Question.find({surveyID: lookupID},(err,questions) =>{
        if(err){
          console.log(err);
        } else {
          res.render('editSurvey', {
            title: 'Edit',
            survey,
            questions,
            isActive: 'admin',
            user: req.user,
          })
        }
      });
    }
  });
};
  
exports.updateSurvey = (req, res) => {
  Question.update({ _id: req.params.id }, req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/admin');
    }
  });
};

//Finds the survey based on the ID associated in the Suirvey page
exports.viewSurvey = (req,res) =>{
  Survey.findById({ _id: req.params.id},(err, survey) =>{
    if (err) {
      console.log(err);
    } else {
      var lookupID = req.params.id
      lookupID.toString();
    Question.find({surveyID: lookupID},(err,questions) =>{
      if(err){
        console.log(err);
      } else {
        res.render('viewSurvey', {
          title: 'View Survey',
          survey,
          questions,
          isActive: 'admin',
          user: req.user,
          })
        }
      });
    }
  });
};

exports.answerSurvey = (req,res) =>{
  Survey.findById({ _id: req.params.id},(err, survey) =>{
    if (err) {
      console.log(err);
    } else {
      var lookupID = req.params.id
      lookupID.toString();
    Question.find({surveyID: lookupID},(err,questions) =>{
      if(err){
        console.log(err);
      } else {
        res.render('viewSurvey', {
          title: 'Answer Survey',
          survey,
          questions,
          isActive: 'admin',
          user: req.user,
          })
        }
      });
    }
  });
};

exports.generateLink = (req, res) => {
  Survey.find({ surveyID: req.params.id}, (err, survey) => {
    if (err) {
      res.render('error');
    } else {
      res.render('generateLink', {
        title: 'Send an answer request',
        surveyID: req.params.id,
        user: req.user,
      });
      console.log(req.survey);
    }
  });
};



exports.contact = (req,res,next) =>{
  const contact = User.findById({_id:req.params.id});

  User.findById({_id:req.params.id},(err,user) =>{
    if(err){
      console.log(err);
    } else{
      res.render('contact',{
      title:'Contact Poster',
      email: user.username,
      //Passing req.user will only show a user in the nav if they were logged in previously
      user: req.user
      });
    }
  });
};

/*
exports.createQuestions = async (req, res) => {
  foreach(async question => {
    try {
    question = new Question(req.body);
      await question.save();
    } catch (err) {
      console.log(err);
    };
  });
  res.redirect('/surveys');
};
*/

